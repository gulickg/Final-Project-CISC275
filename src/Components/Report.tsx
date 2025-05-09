import React from 'react'
import { CareerData } from './CareerData';


export function Report({description, breakdown, title, percentMatch, personalityTraits, skills, salary, potentialMajors}:CareerData):React.JSX.Element{
    return(
    <div id='report'>
        <div id='container'>
            <div id = 'careerSuggestion'>
                {title}
            </div>
            <div id='percentMatch'>
                {percentMatch}%
            </div>
            <div id = 'careerDescription'>
                {description}
            </div>
            <div id='answerBreakdown'>
                {breakdown}
            </div>
            {/* <div id='skills'>
                {skills.map((skill: string) => <div>{skill}</div>)}
            </div>
            <div id='personalityTraits'>
                {personalityTraits.map((trait: string) => <div>{trait}</div>)}
            </div>
            <div id='salary'>
                {salary}
            </div>
            <div id='potentialMajors'>
                {potentialMajors.map((major: string) => <div>{major}</div>)}
            </div> */}
        </div>
    </div>
    );
}