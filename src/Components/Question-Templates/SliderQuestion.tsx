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
    choices: string[];
    addCompleted: () => void;
}

export function SliderRangeQuestion({order, question, choices, addCompleted}: SliderQuestionProps): React.JSX.Element {
    const [selectedIndex, setSelectedChoice] = useState<number>(Math.floor(choices.length / 2));

    // updating the selected answer and marking as completed
    function updateInput(event: React.ChangeEvent<HTMLInputElement>) {
        const newIndex = Number(event.target.value);
        if (selectedIndex === 0 && newIndex !== 0) {
            setSelectedChoice(newIndex);
            addCompleted();
        } else if (selectedIndex !== newIndex){
            setSelectedChoice(newIndex);
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
                <Form.Range
                    className='slider-container'
                    min={0}
                    max={choices.length-1}
                    step={1}
                    value={selectedIndex}
                    onChange={updateInput}
                />
                <div>{choices[selectedIndex]}</div>
        </div>
    </div>
}