import React, {useState} from 'react'
import { Form} from 'react-bootstrap'
import './Questions.css'
import questionMark from './question-mark.png'

/*
template for slider box question
*/


interface SliderQuestionProps {
    order: number;
    question: string;
    choices: [];
    addCompleted: () => void;
}

export function SliderRangeQuestion({order, question, choices, addCompleted}: SliderQuestionProps): React.JSX.Element {
    const [selectedChoice, setSelectedChoice] = useState<string>('');

    // updating the selected answer and marking as completed
    function updateInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (selectedChoice === '' && event.target.value !== '') {
            setSelectedChoice(event.target.value);
            addCompleted();
        } else if (selectedChoice !== event.target.value){
            setSelectedChoice(event.target.value);
        }
    }

    return <div className='slider-question'>
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
                    className=''
                    
            ))}
        </div>
    </div>



}