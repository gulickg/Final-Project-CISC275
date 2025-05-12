import React from 'react'
import { Form } from 'react-bootstrap'
import questionMark from './question-mark.png'
import './Questions.css'

/*
template for text input question
*/

/**
 * Renders a text input question with a tooltip for additional guidance.
 * 
 * This component displays a long-form question that allows the user to input 
 * free-response answers using a textarea. It includes the question number, 
 * a tooltip for context, and tracks updates through a passed-in response handler.
 * 
 * @param {TextQuestionProps} props - the properties passed to the component
 * @param {string} props.question - the text of the question to display
 * @param {number} props.qNumber - the question's index number
 * @param {Function} props.response - callback to update the saved response
 * @param {string} props.answer - current answer value for the question
 * @param {string} props.tool - the tooltip description for the question
 * 
 * @returns {React.JSX.Element} the rendered text input question
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