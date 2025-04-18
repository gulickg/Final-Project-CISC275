import React from 'react'
import './DetailedQuestions.css'
import './BasicQuestions.css'
import './Question-Templates/RadioButtonsQuestion'
import './Question-Templates/TextInputQuestion'
import { TextInputQuestion } from './Question-Templates/TextInputQuestion'
import { Button } from 'react-bootstrap'


/*
This is the detailed questions page
*/

//interface for the Detailed Page properties
interface DetailedProps{
    answers:string[];
    setAnswers: (answers:string[]) => void
    completed:number;
}

/**
 * Renders the app's detailed questions page
 * 
 * @param {DetailedProps} properties - the properties of the detailed page
 * @param {string[]} properties.answers - the list of the current answers
 * @param {Function} properties.setAnswers - the function to set the app's detailed answers
 * @param {number} properties.completed - the number of completed detailed questions
 * 
 * @returns {React.JSX.Element} - the detailed questions page
 */
export function DetailedQuestions({answers, setAnswers, completed}: DetailedProps):React.JSX.Element{
    const totalQuestions = 7;


    interface Question{
        num: number;
        question:string;
        answer: string;
    }

    // list of questions to be mapped onto the page
    const QUESTIONS:Question[] = [
        {num: 1, question:'If you could live anywhere in the world where would you live and why?', answer:answers[0]},
        {num:2, question:'In group settings, what role do you find yourself taking?', answer:answers[1]},
        {num:3, question:'If a customer/client were to lodge a complaint about a mistake you made, what would you do to fix it? Would you go to your boss, or try and fix it on your own?', answer:answers[2]},
        {num:4, question:'If you could fix one problem in the world, what would it be and how would you fix it?', answer:answers[3]},
        {num:5, question:'What do you think the most useful invention has been so far and why?', answer: answers[4]},
        {num:6, question:'Would you rather work in-person or completely online? State which you would choose and explain why.', answer:answers[5]},
        {num:7, question:"Imagine you’re on a forked path. The path to the left has a hospital at the end of it. The path to the right leads to a city of innovation and creativity. Which path do you choose and why?", answer:answers[6]}
    ]

    //updates the progress bar
    const progressPercent:number = updatePercents(completed, totalQuestions);
    const size: string = progressPercent + '%';

    /**
     * Calculates the percent of questions completed
     * 
     * @param {number} completed - the number of questions that have input
     * @param {number} total - the total number of questions on the page
     * 
     * @returns {React.JSX.Element} - the percent of questions completed
     */
    function updatePercents(completed:number, total:number):number{
        return Math.ceil(completed / totalQuestions * 100);
    }

    /**
     * Updates the saved detailed quiz answers
     * 
     * @param {number} questionNum - the number of the question that has been modified
     * @param {number} total - the new inputted answer
     */
    function updateCompleted(questionNum:number, newAns: string){
        let temp:string[] = [...answers];
        temp.splice(questionNum -1, 1, newAns);
        setAnswers(temp);
        updateTaskBar(temp);
    }

    /**
     * Updates the number of questions completed
     * 
     * @param {string[]} temp - the list of answers
     */
    function updateTaskBar(temp:string[]){
        let sum: number = 0;
        for (let answer of temp){
            if (answer !== ''){
                sum++;
            }
        }
        completed = sum;
    }
        return(<div id='detailed-questions-page'>
            <div id='detailed-prog-bar'>
                <div>Progress:</div>
                <div id='detailed-progress-bar-box'>
                    <div id='wrapper'>
                        <div id='detailed-progress-bar' style={{ width: size}}></div>
                    </div>
                </div>
            </div>
            {/* <Button id='scroll-down' className='dbutton' onClick={()=> document.getElementById('detailed-submit')?.scrollIntoView()}>
                <div>↓</div>
            </Button> */}
            <h1 id='title'>Detailed Quiz Questions</h1>
            {QUESTIONS.map((q:Question) => <TextInputQuestion question={q.question} qNumber={q.num} response={updateCompleted} answer={q.answer}></TextInputQuestion>)}
            <div id='ds-wrapper'>
                <div id='dsb-wrapper'>
                    <Button id='detailed-submit' className='dbutton' disabled={progressPercent === 100? false : true}>Submit Responses</Button>
                </div>
            </div>
        </div>);

}