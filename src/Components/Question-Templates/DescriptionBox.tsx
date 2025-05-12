import React from 'react'
import { Button } from 'react-bootstrap';
import '../Homepage/Homepage.css'
import './DescriptionBox.css'
import basic from '../../graphics/basic-icon.png'
import detailed from '../../graphics/detailed-icon.png'
/*
This is the boxes that have the descriptions of each quiz
*/

/**
 * Renders a description box for either the Basic or Detailed quiz.
 * 
 * This component visually presents a quiz option with an icon, title, 
 * and a short description of what the quiz involves. It includes a button 
 * that routes the user to the appropriate quiz page when clicked.
 * 
 * @param {DescriptionProps} props - the properties passed to the component
 * @param {string} props.questionType - type of quiz ("Basic" or "Detailed")
 * @param {string} props.questionDescription - short description of the quiz purpose
 * @param {Function} props.setPage - function to navigate to the selected quiz page
 * 
 * @returns {React.JSX.Element} the rendered description box component
 */


interface DescriptionProps{
    questionType:string;
    questionDescription: string;
    setPage: (page:string) => void
}


export function Description({questionType, questionDescription, setPage}:DescriptionProps):React.JSX.Element{
    const pageChoice = questionType === 'Basic' ? 'basicQuestions' : 'detailedQuestions'

    return(<div id='description-box'>
        
       {pageChoice==='basicQuestions' && <img id='desc-icon' src={basic} alt=''/>}
       {pageChoice==='detailedQuestions' && <img id='desc-icon' src={detailed} alt=''/>}
       <p id='question-type-title'>{questionType}</p>
        <p id='desc'>{questionDescription}</p>
        <div id='button-box'>
            <Button id="continue-button" onClick={()=>setPage(pageChoice)}>Continue to {questionType} Quiz</Button>
        </div>
    </div>);

}