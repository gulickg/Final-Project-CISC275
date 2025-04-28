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
    addCompleted: (num: number, ans: string) => void;
    answer: string;
    tool: string;
}

export function SliderRangeQuestion({order, question, choices, addCompleted, answer, tool}: SliderQuestionProps): React.JSX.Element {
    const [selectedIndex, setSelectedChoice] = useState<number>(Math.floor(choices.length / 2));

    // let selectedIndex: number = Math.floor(choices.length/2);

    // updating the selected answer and marking as completed
    function updateInput(event: React.ChangeEvent<HTMLInputElement>){
            const newAns = event.target.value;
            addCompleted(order, newAns);
            setSelectedChoice(Number(newAns));
        }

    return <div className='slider-question'>
        <div className='question-number'>
            Question {order}:
            <img id='more-info' src={questionMark} alt='question mark'></img>
            <div className='tooltiptext'>{tool}</div>
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
                    // value={selectedIndex}
                    onChange={updateInput}
                    // checked={selectedIndex}
                />
                <div>{choices[selectedIndex]}</div>
        </div>
    </div>
}