import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import './Questions.css'

interface RadioQuestionProps {
    question: string;
    choices: string[];
    addCompleted: () => void;
}

export function RadioButtonQuestion({question, choices, addCompleted}: RadioQuestionProps):React.JSX.Element{
    const [selectedChoice, setSelectedChoice] = useState<string>('');

    function updateInput(event: React.ChangeEvent<HTMLInputElement>){
        if (selectedChoice === '' && event.target.value !== ''){
            setSelectedChoice(event.target.value);
            addCompleted();
        }
    }

    return(<div className='radio-question'>
        <div className='question-number'>
            Question 1:
        </div>
        <div className='question-text'>
            {question}
        </div>
        <div>
            {/* when implementing for real, map the choices & update id + labels */}
            <Form.Check
                className='radio-choices'
                type='radio'
                name='options'
                id='check'
                label='done?'
                value='done'
                onChange={updateInput}
                />
        </div>
    </div>)
}