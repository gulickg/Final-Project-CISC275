import React from 'react'
import { CareerData } from './CareerData';
import './Report.css'

/**
 * Renders the final results page for a completed CareerSprout quiz.
 * 
 * This component displays the user's career suggestion along with a description and a breakdown
 * of how the result was determined. It dynamically updates based on the type of quiz completed 
 * (e.g., "Basic" or "Detailed") and presents the information in a collapsible section for clarity.
 * 
 * @param {string} suggestion - the career suggestion returned by the AI model
 * @param {string} description - a brief explanation of the suggested career
 * @param {string} breakdown - a detailed summary of how the user's responses contributed to the suggestion
 * @param {string} type - the type of quiz taken ("Basic" or "Detailed")
 * 
 * @returns {React.JSX.Element} the rendered report view for quiz results
 */

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