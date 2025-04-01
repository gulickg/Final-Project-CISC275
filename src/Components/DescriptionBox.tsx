import React from 'react'
import './Homepage.css'

interface DescriptionProps{
    questionType:string;
    questionDescription: string;
}

export function Description({questionType}:DescriptionProps, {questionDescription}:DescriptionProps):React.JSX.Element{
    return(<div>
        <div>{questionType}</div>
        <div>{questionDescription}</div>
    </div>);

}