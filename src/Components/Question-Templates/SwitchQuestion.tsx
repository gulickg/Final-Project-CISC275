import React, {useState} from 'react'
import { Form} from 'react-bootstrap'
import './Questions.css'
import questionMark from './question-mark.png'

/*
template for switch box question
*/


interface SwitchQuestionProps {
    order: number;
    question: string;
    addCompleted: () => void;
}

export function SwitchQuestion({order, question, addCompleted}: SwitchQuestionProps): React.JSX.Element {
    const [isFlexible, setIsFlexible] = useState<boolean>(false);

    function changeSwitch(){
        if(!isFlexible) {
            addCompleted();
        }
        setIsFlexible((prev) => !prev);
    }
    
    return <div className='switch-question'>
        <div className='question-number'>
            Question {order}:
            <img id='more-info' src={questionMark} alt='question mark'></img>
        </div>

        <div className='question-text'>
            {question}
        </div>

        <div>
                <Form.Check
                    type="switch"
                    onChange={changeSwitch}
                    label={isFlexible ? "Prefers a flexible schedule": "Prefers a strict 9-5 schedule"}
                    checked={isFlexible}
                />
                <div>{isFlexible}</div>
        </div>
    </div>
}