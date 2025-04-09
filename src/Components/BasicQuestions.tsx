import React, { useState } from 'react'
import './BasicQuestions.css'
import './Question-Templates/RadioButtonsQuestion'
import './Question-Templates/TextInputQuestion'
import { RadioButtonQuestion } from './Question-Templates/RadioButtonsQuestion'


export function BasicQuestions():React.JSX.Element{
    const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
    const totalQuestions = 3;
    const [selected, setSelected] = useState<string[]>([""]);

    // find the percent of questions completed
    let progressPercent:number = Math.ceil(questionsCompleted / totalQuestions * 100)
    let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);

    // pass to each question: updates questions completed
    function addCompleted(){
        setQuestionsCompleted(questionsCompleted + 1);
    }

    // function removeCompleted(){
    //     setQuestionsCompleted(questionsCompleted - 1);
    // }

    return(<div id='basic-questions-page'>
        <h1 id='title'>Basic Quiz Questions</h1>
        <div id='progress-holder'>
            Progress:
            <div id='basic-progress-bar-box'>
                <div id='basic-progress-bar' style={{ width: progressBarSize}}></div>
            </div>
            {progressPercent}%
        </div>
        <div id='question-container'>
            <RadioButtonQuestion order={1} question={"How much time do you usually dedicate per week to hobbies?"} choices={['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={2} question={"Which subject did you perform the best in school?"} choices={['English', 'Math', 'Science', 'Art', 'Social Studies']} addCompleted={addCompleted}></RadioButtonQuestion>
            <RadioButtonQuestion order={3} question={"What is your preferred form of media?"} choices={['Books', 'Podcasts', 'Movies']} addCompleted={addCompleted}></RadioButtonQuestion>
        </div>
    </div>);
}