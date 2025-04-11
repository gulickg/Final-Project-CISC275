import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import questionMark from './question-mark.png'
import './Questions.css'

/*
template for text input question
*/


interface TextQuestionProps {
    question: string;
    qNumber: number
}

export function TextInputQuestion({question, qNumber}: TextQuestionProps):React.JSX.Element{
    const [answer, setAnswer] = useState<string>("");

    function updateAnswer(event:React.ChangeEvent<HTMLTextAreaElement>){
        setAnswer(event.target.value);
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