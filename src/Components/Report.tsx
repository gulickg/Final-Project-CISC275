import React from 'react'
import { CareerData } from './CareerData';


export function Report({type, description, breakdown, title}:CareerData):React.JSX.Element{
    return(
    <div id='report'>
        <h1 id='title'>{type} Quiz Results</h1>
        <div id='container'>
            <div id='box'>
                <div id = 'careerSuggestion'>
                    {title}
                </div>
                <div id = 'careerDescription'>
                    {description}
                </div>
            </div>
            <div id='box'>
                <div id='answerBreakdown'>
                    {breakdown}
                </div>
            </div>
        </div>
    </div>
    );
}