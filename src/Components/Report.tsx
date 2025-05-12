import React from 'react'
import { CareerData } from './CareerData';
import './Report.css'

interface ReportProps{
    career:CareerData;
    page: string;
}

export function Report({career, page}:ReportProps):React.JSX.Element{
    return(
    <div id='report'>
            <div id = 'careerSuggestion'>
                {career.title}
            </div>
            {page==='report' &&<div id='percentMatch'>
                {career.percentMatch}%
            </div>}
            <div id='salary'>
                Average Salary: {career.salary}
            </div>
            <div id = 'careerDescription'>
                {career.description}
            </div>
            {page==='report' && <div id='answerBreakdown'>
                {career.breakdown}
            </div>}
            {page==='report' &&<div id='skills'>
                {career.skills.map((skill: string) => <div>{skill}</div>)}
            </div>}
            {page==='report' &&<div id='personalityTraits'>
                {career.personalityTraits.map((trait: string) => <div>{trait}</div>)}
            </div>}
            <div id='majors'>
                Potential Majors:
                <div id='potentialMajors'>
                    {career.potentialMajors.map((major: string) => <div id='major'>{major}</div>)}
                </div>
            </div>
    </div>
    );
}