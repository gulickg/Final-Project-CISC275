import React from 'react'
import './BasicQuestions.css'
import './DetailedQuestions.css'
import './Question-Templates/RadioButtonsQuestion'
import { RadioButtonQuestion } from './Question-Templates/RadioButtonsQuestion'
// import { SliderRangeQuestion } from './Question-Templates/SliderQuestion'
// import { SwitchQuestion } from './Question-Templates/SwitchQuestion'
import { Button } from 'react-bootstrap'

interface BasicProps {
    answers: string[];
    setAnswers(answers:string[]): void;
    completed: number;
}


export function BasicQuestions({answers, setAnswers, completed}: BasicProps):React.JSX.Element{
    // let answers:string[] = ['', '', '', '', '', '', ''];
    // constants: tracks the questions completed and the total amount of questions there is
    const totalQuestions = 4;

    // radio interface
    interface Radio{
        num: number;
        question: string;
        choices: string[];
        answer: string;
        tooltip: string;
    }

    const TOOLTIPS: string[] = [
        "This helps us understand how important free time and personal interests are to your ideal lifestyle and job.",
        "Your strongest subject can highlight natural strengths and hint at career paths where you might excel.",
        "Your go-to media type can show how you like to absorb information—this is useful for matching learning and working styles.",
        "A fun way to explore your personality traits, which can connect to different work styles and team roles.",
        "This helps determine the kind of social energy you bring to a workplace and what environments might suit you best.",
        "Some careers are solo missions, others are team-based—this question helps narrow down the right fit.",
        "Your comfort with different work settings—like remote vs. in-office or quiet vs. fast-paced—can shape your ideal job match."
    ]

    // radio questions
    const RADIOQ: Radio[] = [
        {num: 1, question: "How much time do you usually dedicate per week to hobbies?", choices: ['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours'], answer:answers[0], tooltip: TOOLTIPS[0]},
        {num: 2, question: "Which subject did you perform the best in school?", choices: ['English', 'Math', 'Science', 'Art', 'Social Studies'], answer: answers[1], tooltip: TOOLTIPS[1]},
        {num: 3, question: "What is your preferred form of media?", choices: ['Books', 'Podcasts', 'Movies'], answer: answers[2], tooltip: TOOLTIPS[2]},
        {num: 4, question: "What Hogwarts house do you belong to?", choices: ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], answer: answers[3], tooltip: TOOLTIPS[3]}
    ];

     // find the percent of questions completed and math for the progress bar
     const progressPercent:number = updatePercents(completed, totalQuestions);
     // let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);
     const size: string = progressPercent + '%';

    // pass to each question: updates the percent for the progress bar
    function updatePercents(completed: number, total: number) {
        return Math.ceil(completed / totalQuestions * 100);
    }


    // update the completed function
    function updateCompleted(qNum: number, newA: string) {
        let temp: string[] = [...answers];
        temp.splice(qNum-1, 1, newA);
        setAnswers(temp);
        updateTaskBar(temp);
    }

    // updates num of questions completed
    function updateTaskBar(temp: string[]){
        let sum: number = 0;
        for (let answer of temp) {
            if (answer !== ''){
                sum++;
            }
        }
        completed = sum;
    }

    // function removeCompleted(){
    //     setQuestionsCompleted(questionsCompleted - 1);
    // }

    return(<div id='detailed-questions-page'>
        <div id='detailed-prog-bar'>
            <div>Progress:</div>
                <div id='detailed-progress-bar-box'>
                    <div id='wrapper'>
                        <div id='detailed-progress-bar' style={{ width: size}}></div>
                </div>
            </div>
        </div>
        <h1 id='title'>Basic Quiz Questions</h1>
        <p>For sliding bar questions, please review all options before selecting your answer.</p>
        <p>* Your answer will not save otherwise!</p>
            {/* <RadioButtonQuestion order={1} question={"How much time do you usually dedicate per week to hobbies?"} choices={['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={2} question={"Which subject did you perform the best in school?"} choices={['English', 'Math', 'Science', 'Art', 'Social Studies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={3} question={"What is your preferred form of media?"} choices={['Books', 'Podcasts', 'Movies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={4} question={"What Hogwarts house do you belong to? If this is not applicable, what house do you think you belong to?"} choices={['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin']} addCompleted={addCompleted}></RadioButtonQuestion> */}
            {RADIOQ.map((rq: Radio) => <RadioButtonQuestion order={rq.num} question={rq.question} choices={rq.choices} addCompleted={updateCompleted} answer={rq.answer} tool={rq.tooltip}></RadioButtonQuestion>
            )}
            
            {/* <SliderRangeQuestion order={5} question={"Would you consider yourself an introvert or extrovert?"} choices={['Introvert', 'I\'m a little quiet', 'Ambivert', 'I\'m a little loud', 'Extrovert']}></SliderRangeQuestion>
            <SliderRangeQuestion order={6} question={"Do you like to work by yourself or in a group?"} choices={['Alone', 'I prefer to be alone', 'I\'ll collaborate', 'I like working with others', 'Team work makes the dream work!']}></SliderRangeQuestion> */}
            {/* <SwitchQuestion order={7} question={"What working environment do you prefer?"}></SwitchQuestion> */}
        <div id='bottom-space'>
            <Button disabled={progressPercent < 100}>SUBMIT</Button>
        </div>
        
    </div>);
}