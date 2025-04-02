import React, { useState } from 'react'
import './BasicQuestions.css'
import './Question-Templates/RadioButtonsQuestion'
import './Question-Templates/TextInputQuestion'
import { RadioButtonQuestion } from './Question-Templates/RadioButtonsQuestion'

interface ProgressBarProps{
    width: number
}

export function BasicQuestions():React.JSX.Element{
    const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
    const totalQuestions = 1;

    let progressPercent:number = Math.ceil(questionsCompleted / totalQuestions * 100)
    let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);

    function addCompleted(){
        setQuestionsCompleted(questionsCompleted + 1);
    }

    function removeCompleted(){
        setQuestionsCompleted(questionsCompleted - 1);
    }

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
            <RadioButtonQuestion question={"This is an example question"} choices={['one', 'two']} addCompleted={addCompleted}></RadioButtonQuestion>
        </div>
    </div>);
}