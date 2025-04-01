import React from 'react'
import { Button } from 'react-bootstrap';
import './Homepage.css'
import './DescriptionBox.css'

interface DescriptionProps{
    questionType:string;
    questionDescription: string;
}

export function Description({questionType, questionDescription}:DescriptionProps):React.JSX.Element{
    return(<div id='description-box'>
        <p id='question-type-title'>{questionType}</p>
        <p id='desc'>{questionDescription}</p>
        <div id='button-box'>
            <Button id="continue-button">Continue to Quiz</Button>
        </div>
    </div>);

}