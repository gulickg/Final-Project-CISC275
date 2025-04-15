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
    
    interface Question{
        num: number;
        question:string;
    }

    const QUESTIONS:Question[] = [
        {num: 1, question:'If you could live anywhere in the world where would you live and why?'},
        {num:2, question:'In group settings, what role do you find yourself taking?'},
        {num:3, question:'If a customer/client were to lodge a complaint about a mistake you made, what would you do to fix it? Would you go to your boss, or try and fix it on your own?'},
        {num:5, question:'If you could fix one problem in the world, what would it be and how would you fix it?'},
        {num:6, question:'What do you think the most useful invention has been so far and why?'},
        {num:7, question:'Would you rather work in-person or completely online? State which you would choose and explain why.'},
        {num:8, question:"Imagine you’re on a forked path. The path to the left has a hospital at the end of it. The path to the right leads to a city of innovation and creativity. Which path do you choose and why?"}
    ]

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
            <div id='detailed-prog-bar'>
                <div>Progress:</div>
                <div id='detailed-progress-bar-box'>
                    <div id='detailed-progress-bar' style={{ width: progressBarSize}}></div>
                </div>
            </div>
            {QUESTIONS.map((q:Question) => <TextInputQuestion question={q.question} qNumber={q.num} response={updateCompleted}></TextInputQuestion>)}
        </div>);

}