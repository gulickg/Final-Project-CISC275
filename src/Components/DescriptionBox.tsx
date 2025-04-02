import React from 'react'
import { Button } from 'react-bootstrap';
import './Homepage.css'
import './DescriptionBox.css'

interface DescriptionProps{
    questionType:string;
    questionDescription: string;
    setPage: (page:string) => void
}


export function Description({questionType, questionDescription, setPage}:DescriptionProps):React.JSX.Element{
    const pageChoice = questionType === 'Basic' ? 'basicQuestions' : 'detailedQuestions'

    return(<div id='description-box'>
        <p id='question-type-title'>{questionType}</p>
        <p id='desc'>{questionDescription}</p>
        <div id='button-box'>
            <Button id="continue-button" onClick={()=>setPage(pageChoice)}>Continue to {questionType} Quiz</Button>
        </div>
    </div>);

}