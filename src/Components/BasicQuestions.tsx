import React,{ useState } from 'react'
import './BasicQuestions.css'
import './Question-Templates/RadioButtonsQuestion'
import './Question-Templates/TextInputQuestion'
import { RadioButtonQuestion } from './Question-Templates/RadioButtonsQuestion'
import { SliderRangeQuestion } from './Question-Templates/SliderQuestion'
import { SwitchQuestion } from './Question-Templates/SwitchQuestion'
import { Button } from 'react-bootstrap'



// answer type to easily track the questions and answers associated with them
// type Answer = { question: string; answer: string}

interface BasicProps {
    answers: string[];
    setAnswers(answers:string[]): void;
    completed: number;
}


export function BasicQuestions():React.JSX.Element{
    let answers:string[] = ['', '', '', '', '', '', ''];
    // constants: tracks the questions completed and the total amount of questions there is
    const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
    const totalQuestions = 7;

    // find the percent of questions completed and math for the progress bar
    let progressPercent:number = Math.ceil(questionsCompleted / totalQuestions * 100);
    // let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);
    const size: string = progressPercent + '%';

    // radio interface
    interface Radio{
        num: number;
        question: string;
        choices: string[];
        answer: string;
    }

    // radio questions
    const RADIOQ: Radio[] = [
        {num: 1, question: "How much time do you usually dedicate per week to hobbies?", choices: ['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours'], answer:answers[0]},
        {num: 2, question: "Which subject did you perform the best in school?", choices: ['English', 'Math', 'Science', 'Art', 'Social Studies'], answer: answers[1]},
        {num: 3, question: "What is your preferred form of media?", choices: ['Books', 'Podcasts', 'Movies'], answer: answers[2]},
        {num: 4, question: "What Hogwarts house do you belong to?", choices: ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], answer: answers[3]}
    ];

    // pass to each question: updates questions completed
    function addCompleted(){
        setQuestionsCompleted(questionsCompleted + 1);
        // setSelected(selected[order]);
    }

    // function removeCompleted(){
    //     setQuestionsCompleted(questionsCompleted - 1);
    // }

    return(<div id='basic-questions-page'>
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
        <div id='question-container'>
            {/* <RadioButtonQuestion order={1} question={"How much time do you usually dedicate per week to hobbies?"} choices={['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={2} question={"Which subject did you perform the best in school?"} choices={['English', 'Math', 'Science', 'Art', 'Social Studies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={3} question={"What is your preferred form of media?"} choices={['Books', 'Podcasts', 'Movies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={4} question={"What Hogwarts house do you belong to? If this is not applicable, what house do you think you belong to?"} choices={['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin']} addCompleted={addCompleted}></RadioButtonQuestion> */}
            {RADIOQ.map((rq: Radio) => <RadioButtonQuestion order={rq.num} question={rq.question} choices={rq.choices} addCompleted={addCompleted}></RadioButtonQuestion>
            )}
            
            <SliderRangeQuestion order={5} question={"Would you consider yourself an introvert or extrovert?"} choices={['Introvert', 'I\'m a little quiet', 'Ambivert', 'I\'m a little loud', 'Extrovert']} addCompleted={addCompleted}></SliderRangeQuestion>
            <SliderRangeQuestion order={6} question={"Do you like to work by yourself or in a group?"} choices={['Alone', 'I prefer to be alone', 'I\'ll collaborate', 'I like working with others', 'Team work makes the dream work!']} addCompleted={addCompleted}></SliderRangeQuestion>
            <SwitchQuestion order={7} question={"What working environment do you prefer?"} addCompleted={addCompleted}></SwitchQuestion>
        </div>
        <div id='bottom-space'>
            <Button onClick={addCompleted}
            disabled={progressPercent < 100}>SUBMIT</Button>
            <div>saved answers here when i figure that out            
                </div>
        </div>
        
    </div>);
}