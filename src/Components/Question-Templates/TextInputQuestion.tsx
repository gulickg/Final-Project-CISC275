import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import questionMark from './question-mark.png'
import './Questions.css'
import ProgressBar from 'react-bootstrap'

/*
template for text input question
*/


interface TextQuestionProps {
    question: string;
    qNumber: number;
    response: (num:number, ans:string)=>void;
}

export function TextInputQuestion({question, qNumber, response}: TextQuestionProps):React.JSX.Element{
    const [answer, setAnswer] = useState<string>("");
    const [empty, setEmpty] = useState<boolean>(false);

    function updateAnswer(event:React.ChangeEvent<HTMLTextAreaElement>){
        const newAnswer = event.target.value;
        setAnswer(newAnswer);
        response(qNumber, newAnswer);
    }


    return(<div className='text-input-question'>
        <div className='question-number'>
            Question 1:
            <img id='more-info' src={questionMark} alt='question mark'></img>
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