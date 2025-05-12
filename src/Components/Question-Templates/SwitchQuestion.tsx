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
    choices: string[];
    addCompleted: (num: number, ans: string) => void;
    answer: string;
    tool: string;
}

export function SwitchQuestion({order, question, choices, addCompleted, answer, tool}: SwitchQuestionProps): React.JSX.Element {
    const [isFlexible, setIsFlexible] = useState<boolean>(true);

    // function changeSwitch(event: React.ChangeEvent<HTMLInputElement>) {
    //     // let temp: boolean = isFlexible;
    //     // setIsFlexible(!temp);
    //     setIsFlexible(event.target.checked);
    //     addCompleted(order, answer);
    // }

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