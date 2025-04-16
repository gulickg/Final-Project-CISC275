import React from 'react'
import { Form } from 'react-bootstrap'
import questionMark from './question-mark.png'
import './Questions.css'

/*
template for text input question
*/


interface TextQuestionProps {
    question: string;
    qNumber: number;
    response: (num:number, ans:string)=>void;
    answer: string
}

export function TextInputQuestion({question, qNumber, response, answer}: TextQuestionProps):React.JSX.Element{

    function updateAnswer(event:React.ChangeEvent<HTMLTextAreaElement>){
        const newAnswer = event.target.value;
        response(qNumber, newAnswer);
    }


    return(<div className='text-input-question'>
        <div className='question-number'>
            Question {qNumber}:
            <div id='img-holder' className='tooltip'>
                <img id='more-info' src={questionMark} alt='question mark'></img>
                <div className='tooltiptext'>hey</div>
            </div>
        </div>
        <div>
            <Form.Group controlId='text-answer'>
                <Form.Label className='question-text'>
                    {question}
                </Form.Label>
                <Form.Control
                as='textarea'
                rows={3}
                value={answer}
                onChange={updateAnswer}>
                </Form.Control>
            </Form.Group>
        </div>
    </div>)
}