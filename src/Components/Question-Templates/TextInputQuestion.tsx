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
    answer: string;
    tool: string;
}

/**
 * Default textbox input question
 * 
 * @param {TextQuestionProps} properties - the properties of the text input question
 * @param {string} properties.question - the question to be displayed
 * @param {number} properties.qNumber - the question number
 * @param {Function} properties.response - the function to update where it's saved
 * @param {string} properties.answer - the inputted answer
 * @param {string} properties.tool - the tooltip
 * 
 * @returns {React.JSX.Element} - a text input question
 */
export function TextInputQuestion({question, qNumber, response, answer, tool}: TextQuestionProps):React.JSX.Element{


    /**
     * Updates the saved response
     * 
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - the event triggered by the user's input
     */
    function updateAnswer(event:React.ChangeEvent<HTMLTextAreaElement>){
        const newAnswer = event.target.value;
        response(qNumber, newAnswer);
    }


    return(<div className='text-input-question'>
        <div className='question-number'>
            Question {qNumber}:
            <div id='img-holder' className='tooltip'>
                <img id='more-info' src={questionMark} alt='question mark'></img>
                <div className='tooltiptext'>{tool}</div>
            </div>
        </div>
        <div>
            <Form.Group controlId='text-answer'>
                <Form.Label className='question-text'>
                    {question}
                </Form.Label>
                <Form.Control
                as='textarea'
                rows={5}
                value={answer}
                onChange={updateAnswer}>
                </Form.Control>
            </Form.Group>
        </div>
    </div>)
}