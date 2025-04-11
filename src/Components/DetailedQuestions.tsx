import React, { useState } from 'react'
import './DetailedQuestions.css'
import './BasicQuestions.css'
import './Question-Templates/RadioButtonsQuestion'
import './Question-Templates/TextInputQuestion'
import { TextInputQuestion } from './Question-Templates/TextInputQuestion'


/*
This is the detailed questions page
*/


export function DetailedQuestions():React.JSX.Element{
    const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
    const totalQuestions = 7;
    
    // find the percent of questions completed
    // let progressPercent:number = Math.ceil(questionsCompleted / totalQuestions * 100)
    // let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);
    // setQuestionsCompleted(1);
    // pass to each question: updates questions completed
    // function addCompleted(){
    //     setQuestionsCompleted(questionsCompleted + 1);
    // }

    // function removeCompleted(){
    //     setQuestionsCompleted(questionsCompleted - 1);
    // }
    
        return(<div id='detailed-questions-page'>
            <h1 id='title'>Detailed Quiz Questions</h1>
            <div>Progress:</div>
            {/* <div id='detailed-progress-bar-box'>
                <div id='detailed-progress-bar' style={{ width: progressBarSize}}></div>
            </div>
            {progressPercent}% */}
            <TextInputQuestion question='example' qNumber={1}></TextInputQuestion>
        </div>);

}