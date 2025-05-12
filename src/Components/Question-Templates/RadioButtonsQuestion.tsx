import React from 'react'
import {Form} from 'react-bootstrap'
import './Questions.css'
import questionMark from './question-mark.png'

/*
template for radio box question
*/

/**
 * Renders a multiple-choice radio button question with a tooltip.
 * 
 * This component displays a single-select question where users can choose one option 
 * from a list of predefined choices. A tooltip provides additional context about the 
 * purpose of the question. The selected answer is managed via a callback to the parent component.
 * 
 * @param {RadioQuestionProps} props - the properties passed to the component
 * @param {number} props.order - the question's index number
 * @param {string} props.question - the text of the question to display
 * @param {string[]} props.choices - the list of answer options
 * @param {Function} props.addCompleted - callback to update the selected answer
 * @param {string} props.answer - the current selected answer
 * @param {string} props.tool - the tooltip description for the question
 * 
 * @returns {React.JSX.Element} the rendered radio button question
 */


interface RadioQuestionProps {
    order: number;
    question: string;
    choices: string[];
    addCompleted: (num: number, ans: string) => void;
    answer: string;
    tool: string;
}

export function RadioButtonQuestion({order, question, choices, addCompleted, answer, tool}: RadioQuestionProps):React.JSX.Element{

    function updateInput(event: React.ChangeEvent<HTMLInputElement>){
        const newAns = event.target.value;
        addCompleted(order, newAns);
    }

    return(<div className='radio-question'>
        <div className='question-number'>
            Question {order}:
            <div id='img-holder' className='tooltip'>
                <img id='more-info' src={questionMark} alt='question mark'></img>
                <div className='tooltiptext'>{tool}</div>
            </div>
        </div>
        <div>
            <Form.Group controlId='check-answer'>
                <Form.Label className='question-text'>
                    {question}
                </Form.Label>
            {choices ? choices.map((c: string) => (
                <Form.Check
                key={question}
                className='radio-choices'
                type='radio'
                name={question}
                id='check'
                label={c}
                value={c}
                onChange={updateInput}
                checked={c === answer}
                />
            )): " "}
            </Form.Group>
            
        </div>
    </div>)
}