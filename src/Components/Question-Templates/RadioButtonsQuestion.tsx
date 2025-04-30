import React from 'react'
import {Form} from 'react-bootstrap'
import './Questions.css'
import questionMark from './question-mark.png'

/*
template for radio box question
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
        <div className='question-text'>
            {question}
        </div>
        <div>
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
            
        </div>
    </div>)
}