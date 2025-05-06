import React from 'react'
import './BasicQuestions.css'
import '../Detailed-Questions-Folder/DetailedQuestions.css'
import '../Question-Templates/RadioButtonsQuestion'

import { RadioButtonQuestion } from '../Question-Templates/RadioButtonsQuestion'
import { SliderRangeQuestion } from '../Question-Templates/SliderQuestion'
import { SwitchQuestion } from '../Question-Templates/SwitchQuestion'
import { Button } from 'react-bootstrap'

interface BasicProps {
    answers: string[];
    setAnswers(answers:string[]): void;
    completed: number;
}


export function BasicQuestions({answers, setAnswers, completed}: BasicProps):React.JSX.Element{
    // constants: tracks the questions completed and the total amount of questions there is
    const totalQuestions = 7;

    // radio question interface
    // interface Radio{
    //     num: number;
    //     question: string;
    //     choices: string[];
    //     answer: string;
    //     tooltip: string;
    // }

    interface Question{
        num: number;
        question:string;
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
    const RADIOQ: Question[] = [
        {num: 1, question: "How much time do you usually dedicate per week to hobbies?", choices: ['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours'], answer:answers[0], tooltip: TOOLTIPS[0]},
        {num: 2, question: "Which subject did you perform the best in school?", choices: ['English', 'Math', 'Science', 'Art', 'Social Studies'], answer: answers[1], tooltip: TOOLTIPS[1]},
        {num: 3, question: "What is your preferred form of media?", choices: ['Books', 'Podcasts', 'Movies'], answer: answers[2], tooltip: TOOLTIPS[2]},
        {num: 4, question: "What Hogwarts house do you belong to?", choices: ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], answer: answers[3], tooltip: TOOLTIPS[3]}
    ];

    const SLIDERQ: Question[] = [
        {num: 5, question: "Would you consider yourself an introvert or extrovert?", choices: ['Introvert', 'I\'m a little quiet', 'Ambivert', 'I\'m a little loud', 'Extrovert'], answer: answers[4], tooltip: TOOLTIPS[4]},
        {num: 6, question: "Do you like to work by yourself or in a group?", choices: ['Alone', 'I prefer to be alone', 'I\'ll collaborate', 'I like working with others', 'Team work makes the dream work!'], answer: answers[5], tooltip: TOOLTIPS[5]}
    ];

    const SWITCHQ: Question = {num: 7, question: "What working environment do you prefer?", choices: ['Flexible Schedule', 'Strict Schedule'], answer: answers[6], tooltip: TOOLTIPS[6]};

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
                <div id='detailed-progress-bar-box'>
                    <div id='wrapper'>
                        <div id='detailed-progress-bar' style={{ width: size}}></div>
                </div>
            </div>
        </div>
        <h1 id='dtitle'>Basic Quiz Questions</h1>

            {/* <RadioButtonQuestion order={1} question={"How much time do you usually dedicate per week to hobbies?"} choices={['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={2} question={"Which subject did you perform the best in school?"} choices={['English', 'Math', 'Science', 'Art', 'Social Studies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={3} question={"What is your preferred form of media?"} choices={['Books', 'Podcasts', 'Movies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={4} question={"What Hogwarts house do you belong to? If this is not applicable, what house do you think you belong to?"} choices={['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin']} addCompleted={addCompleted}></RadioButtonQuestion> */}
            {RADIOQ.map((rq: Question) => <RadioButtonQuestion order={rq.num} question={rq.question} choices={rq.choices} addCompleted={updateCompleted} answer={rq.answer} tool={rq.tooltip}></RadioButtonQuestion>)}

            {SLIDERQ.map((sq: Question) => <SliderRangeQuestion order={sq.num} question={sq.question} choices={sq.choices} addCompleted={updateCompleted} answer={sq.answer} tool={sq.tooltip}></SliderRangeQuestion>)}

            <SwitchQuestion order={SWITCHQ.num} question={SWITCHQ.question} choices={SWITCHQ.choices} addCompleted={updateCompleted} answer={SWITCHQ.answer} tool={SWITCHQ.tooltip}></SwitchQuestion>
            
            {/* <SwitchQuestion order={7} question={"What working environment do you prefer?"}></SwitchQuestion> */}
        <div id='s-wrapper'>
            <div id='sb-wrapper'>
                <Button id='detailed-submit' className='dbutton' disabled={progressPercent === 100? false : true}>Submit Responses</Button>
            </div>
        </div>
        
    </div>);
}