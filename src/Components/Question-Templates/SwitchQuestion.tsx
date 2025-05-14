import React, {useState} from 'react'
import { Form} from 'react-bootstrap'
import './Questions.css'
import questionMark from './question-mark.png'


/**
 * Renders a binary switch-style question with a tooltip.
 * 
 * This component presents a toggle switch for a two-option question, such as choosing 
 * between a flexible or strict schedule. The user’s selection is reflected in the label 
 * and passed back to the parent component via a callback. A tooltip is included to 
 * clarify the purpose of the question.
 * 
 * @param {SwitchQuestionProps} props - the properties passed to the component
 * @param {number} props.order - the question's index number
 * @param {string} props.question - the text of the question to display
 * @param {string[]} props.choices - two answer options shown based on the toggle state
 * @param {Function} props.addCompleted - callback to update the selected answer
 * @param {string} props.answer - the current answer
 * @param {string} props.tool - the tooltip text providing question context
 * 
 * @returns {React.JSX.Element} the rendered switch-style question
 */



interface SwitchQuestionProps {
    order: number;
    question: string;
    choices: string[];
    addCompleted: (num: number, ans: string) => void;
    answer: string;
    tool: string;
}

export function SwitchQuestion({order, question, choices, addCompleted, answer, tool}: SwitchQuestionProps): React.JSX.Element {
    const [isFlexible, setIsFlexible] = useState<boolean>(true);

    /**
    * Updates the switch's value and adds to the completed questions
    * 
    * @param {React.ChangeEvent<HTMLInputElement>} event - selected answer
    * 
    */
    function changeSwitch(event: React.ChangeEvent<HTMLInputElement>) {
        const newAns = event.target.checked;
        setIsFlexible(newAns)
        addCompleted(order, newAns.toString())
      }
    
    return <div className='switch-question'>
        <div className='question-number'>
            Question {order}:
            <div id='img-holder' className='tooltip'>
                <img id='more-info' src={questionMark} alt='question mark'></img>
                <div className='tooltiptext'>{tool}</div>
            </div>
        </div>
            <div className='question-text'>{question}</div>
        <div id='basic-container'>
            <Form.Group>
                    <Form.Check
                        type="switch"
                        onChange={changeSwitch}
                        checked={isFlexible}
                    />
            </Form.Group>
            {isFlexible ? choices[0] : choices[1]}
        </div>
        
    </div>
}