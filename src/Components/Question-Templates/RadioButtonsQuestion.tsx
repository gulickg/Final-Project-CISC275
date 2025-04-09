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
    addCompleted: () => void;
}

export function RadioButtonQuestion({order, question, choices, addCompleted}: RadioQuestionProps):React.JSX.Element{
    const [selectedChoice, setSelectedChoice] = useState<string>('');


    // changes the selected choice when the user inputs something. only changes questions completed if it changes
    // from no choice to a choice
    function updateInput(event: React.ChangeEvent<HTMLInputElement>){
        if (selectedChoice === '' && event.target.value !== ''){
            setSelectedChoice(event.target.value);
            addCompleted();
        } else if (selectedChoice !== event.target.value){
            setSelectedChoice(event.target.value);
        }
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
            {/* when implementing for real, map the choices & update id + labels */}
            {choices.map((c: string) => (
                <Form.Check
                className='radio-choices'
                type='radio'
                name='options'
                id='check'
                label= {c}
                value= {c}
                onChange={updateInput}
                />
            ))}
            
        </div>
    </div>)
}