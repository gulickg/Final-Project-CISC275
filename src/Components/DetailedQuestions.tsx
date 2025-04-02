import React, { useState } from 'react'
import './DetailedQuestions.css'

interface ProgressBarProps{
    width: number
}

export function DetailedQuestions():React.JSX.Element{
    const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
        const totalQuestions = 7;
    
        const progressPercent = Math.ceil(questionsCompleted / totalQuestions * 100)
        const progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);
    
    
        return(<div id='detailed-questions-page'>
            <h1 id='title'>Detailed Quiz Questions</h1>
            <div>Progress:</div>
            <div id='detailed-progress-bar-box'>
                <div id='detailed-progress-bar' style={{ width: progressBarSize}}></div>
            </div>
            {progressPercent}%
        </div>);

}