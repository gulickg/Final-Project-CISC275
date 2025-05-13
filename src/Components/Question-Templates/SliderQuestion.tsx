import React, {useState} from 'react'
import { Form} from 'react-bootstrap'
import './Questions.css'
import questionMark from './question-mark.png'

/*
template for slider box question
*/

/**
 * Renders a slider-style question with a tooltip and labeled choices.
 * 
 * This component displays a question with a range input (slider) allowing the user 
 * to select one of several ordered choices. The selected index updates the answer 
 * and is passed to the parent via a callback. A tooltip provides context about the 
 * question’s intent, and the currently selected choice is displayed below the slider.
 * 
 * @param {SliderQuestionProps} props - the properties passed to the component
 * @param {number} props.order - the question's index number
 * @param {string} props.question - the text of the question to display
 * @param {string[]} props.choices - ordered list of choices to map to slider positions
 * @param {Function} props.addCompleted - callback to update the selected answer
 * @param {string} props.answer - the current answer value
 * @param {string} props.tool - the tooltip text explaining the question
 * 
 * @returns {React.JSX.Element} the rendered slider-style question
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

    function updateInput(event: React.ChangeEvent<HTMLInputElement>){
            const newAns = event.target.value;
            addCompleted(order, newAns);
            setSelectedChoice(Number(newAns));
        }

    return <div className='slider-question'>
        <div className='question-number'>
            Question {order}:
            <div id='img-holder' className='tooltip'>
                <img id='more-info' src={questionMark} alt='question mark'></img>
                <div className='tooltiptext'>{tool}</div>
            </div>
        </div>
        <div className='question-text'>{question}</div>
        <div id='basic-container'>
            <Form.Group controlId='check-answer'>
                <Form.Range
                    className='slider-container'
                    min={0}
                    max={choices.length-1}
                    step={1}
                    onChange={updateInput}
                />
            </Form.Group>
            {choices[selectedIndex]}
        </div>
    </div>
}