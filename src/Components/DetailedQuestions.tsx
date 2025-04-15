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
    const [answers, setAnswers] = useState<string[]>(['', '', '', '', '', '', '']);
    const totalQuestions = 7;
    

    const progressPercent:number = updatePercents(questionsCompleted, totalQuestions);
    let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);

    function updatePercents(completed:number, total:number):number{
        return Math.ceil(completed / totalQuestions * 100);
    }


    // find the percent of questions completed
    // setQuestionsCompleted(1);
    // pass to each question: updates questions completed

    function updateCompleted(questionNum:number, newAns: string){
        let temp:string[] = [...answers];
        temp.splice(questionNum -1, 1, newAns);
        setAnswers(temp);
        updateTaskBar(temp);
    }


    function updateTaskBar(temp:string[]){
        let sum: number = 0;
        for (let answer of temp){
            if (answer !== ''){
                sum++;
            }
        }
        setQuestionsCompleted(sum);
    }
    
        return(<div id='detailed-questions-page'>
            <h1 id='title'>Detailed Quiz Questions</h1>
            <div>Progress:</div>
            <div id='detailed-progress-bar-box'>
                <div id='detailed-progress-bar' style={{ width: progressBarSize}}></div>
            </div>
            {progressPercent}%
            <TextInputQuestion question='example' qNumber={1} response={updateCompleted}></TextInputQuestion>
            let: {answers[0]}
        </div>);

}