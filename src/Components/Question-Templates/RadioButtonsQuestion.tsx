import React, {useState} from 'react'
import { Form} from 'react-bootstrap'
import './Questions.css'
import questionMark from './question-mark.png'

/*
template for radio box question
*/


interface RadioQuestionProps {
    order: number;
    question: string;
    choices: string[];
    completed: (num: number, ans: string) => void;
    answer: string
}

export function RadioButtonQuestion({order, question, choices, completed, answer}: RadioQuestionProps):React.JSX.Element{
    // const [selectedChoice, setSelectedChoice] = useState<string>('');


    // changes the selected choice when the user inputs something. only changes questions completed if it changes
    // from no choice to a choice
    function updateInput(event: React.ChangeEvent<HTMLInputElement>){
        const newAnswer = event.target.value;
        
    }

    return(<div className='radio-question'>
        <div className='question-number'>
            Question {order}:
            <img id='more-info' src={questionMark} alt='question mark'></img>
        </div>
        <div className='question-text'>
            {question}
        </div>
        <div>
            {choices.map((c: string) => (
                <Form.Check
                key={question}
                className='radio-choices'
                type='radio'
                name={question}
                id='check'
                label= {c}
                value= {answer}
                onChange={(event) => {updateInput(event);
                }}
                />
            ))}
            
        </div>
    </div>)
}