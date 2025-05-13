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
console.log("potentialMajors", career.potentialMajors);
console.log("Type of potentialMajors:", typeof career.potentialMajors);
    return(
    <div id='report' className='profile'>
            <div id = 'careerSuggestion' className='profile'>
                {career.title}
            </div>
            <div id='salary' className='profile'>
                Average Salary: {career.salary}
            </div>
            {page==='report' &&<div id='percentMatch' className='profile'>
                {career.percentMatch}%
            </div>}
            <div id = 'careerDescription' className='profile'>
                {career.description}
            </div>
            <div id='majors' className='profile'>
                Potential Majors:
                <div id='potentialMajors' className='profile'>
                   {career.potentialMajors.map((major:string) => <div id='major' className='profile'>{major}</div>)}
                </div>
            </div>
    </div>
    );
}