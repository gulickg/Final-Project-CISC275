import React from 'react'
// import { Form, Button} from 'react-bootstrap'
import './Questions.css'

/*
template for text input question
*/


interface TextQuestionProps {
    question: string;
}

export function TextInputQuestion({question}: TextQuestionProps):React.JSX.Element{
    return(<div className='text-input-question'></div>)
}