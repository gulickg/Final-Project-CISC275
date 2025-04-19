import React,{ useState } from 'react'
import './BasicQuestions.css'
import './Question-Templates/RadioButtonsQuestion'
import './Question-Templates/TextInputQuestion'
import { RadioButtonQuestion } from './Question-Templates/RadioButtonsQuestion'
import { SliderRangeQuestion } from './Question-Templates/SliderQuestion'
import { SwitchQuestion } from './Question-Templates/SwitchQuestion'
import { Button } from 'react-bootstrap'

// answer type to easily track the questions and answers associated with them
type Answer = { question: string; answer: string}


export function BasicQuestions():React.JSX.Element{
    // constants: tracks the questions completed and the total amount of questions there is
    const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
    const totalQuestions = 7;

    // find the percent of questions completed and math for the progress bar
    let progressPercent:number = Math.ceil(questionsCompleted / totalQuestions * 100);
    let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);

    // constant for answers
    const [answers, setAnswers] = useState<Answer[]>([]);

    // pass to each question: updates questions completed
    function addCompleted(){
        setQuestionsCompleted(questionsCompleted + 1);
        // setSelected(selected[order]);
    }

    // collecting answers from the screen
    function collectAnswers() {
        let newAnswers: Answer[] = [];
        document.querySelectorAll<HTMLInputElement>("input[type='radio']:checked").forEach((radio) => {
            newAnswers.push({ question: radio.name, answer: radio.value});
        });

        document.querySelectorAll<HTMLInputElement>("input[type='range']").forEach((select) => {
            newAnswers.push({ question: select.name, answer: select.value});
        });

        document.querySelectorAll<HTMLInputElement>("input[type='checkbox']").forEach((s) => {
            newAnswers.push({ question: s.name, answer: s.checked ? "Prefers a flexible schedule" : "Prefers a strict 9-5 schedule"});
        });

        setAnswers(newAnswers);
        progressPercent = 100;
    }

    // function removeCompleted(){
    //     setQuestionsCompleted(questionsCompleted - 1);
    // }

    return(<div id='basic-questions-page'>
        <h1 id='title'>Basic Quiz Questions</h1>
        <p>For sliding bar questions, please review all options before selecting your answer.</p>
        <p>* Your answer will not save otherwise!</p>
        <div id='progress-holder'>
            Progress:
            <div id='basic-progress-bar-box'>
                <div id='basic-progress-bar' style={{ width: progressBarSize}}></div>
            </div>
            {progressPercent < 100 ? progressPercent : 100}%
        </div>
        <div id='question-container'>
            <RadioButtonQuestion order={1} question={"How much time do you usually dedicate per week to hobbies?"} choices={['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={2} question={"Which subject did you perform the best in school?"} choices={['English', 'Math', 'Science', 'Art', 'Social Studies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={3} question={"What is your preferred form of media?"} choices={['Books', 'Podcasts', 'Movies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={4} question={"What Hogwarts house do you belong to? If this is not applicable, what house do you think you belong to?"} choices={['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin']} addCompleted={addCompleted}></RadioButtonQuestion>
            <SliderRangeQuestion order={5} question={"Would you consider yourself an introvert or extrovert?"} choices={['Introvert', 'I\'m a little quiet', 'Ambivert', 'I\'m a little loud', 'Extrovert']} addCompleted={addCompleted}></SliderRangeQuestion>
            <SliderRangeQuestion order={6} question={"Do you like to work by yourself or in a group?"} choices={['Alone', 'I prefer to be alone', 'I\'ll collaborate', 'I like working with others', 'Team work makes the dream work!']} addCompleted={addCompleted}></SliderRangeQuestion>
            <SwitchQuestion order={7} question={"What working environment do you prefer?"} addCompleted={addCompleted}></SwitchQuestion>
        </div>
        <div id='bottom-space'>
            <Button onClick={collectAnswers}
            disabled={progressPercent < 100}>SUBMIT</Button>
            <div>Your Saved Answers:            
                {answers.map((a: Answer) =>
                <div>{a.answer}</div>)}</div>
        </div>
        
    </div>);
}