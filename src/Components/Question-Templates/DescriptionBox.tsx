import React from 'react'
import { Button } from 'react-bootstrap';
import '../Homepage.css'
import './DescriptionBox.css'
import basic from '../../graphics/basic-icon.png'
import detailed from '../../graphics/detailed-icon.png'
/*
This is the boxes that have the descriptions of each quiz
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