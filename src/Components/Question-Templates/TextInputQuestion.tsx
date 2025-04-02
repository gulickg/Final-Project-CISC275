import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import './Questions.css'

interface TextQuestionProps {
    question: string;
}

export function TextInputQuestion({question}: TextQuestionProps):React.JSX.Element{
    return(<div className='text-input-question'></div>)
}