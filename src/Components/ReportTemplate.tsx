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
}

export function ReportTemplate({career}:ReportProps):React.JSX.Element{
    return(
    <div id='report' className='report'> 
            <div id = 'careerSuggestion' className='report'>
                {career.title}
            </div>
            <div id='percent-circle' className='report'>
                <div>{career.percentMatch}%</div>
            </div>
            <div id='salary' className='report'>
                Average Salary: {career.salary}
            </div>
            <div id = 'careerDescription' className='report'>
                {career.description}
            </div>
            <div id='answerBreakdown' className='report'>
                {career.breakdown}
                </div>
           <div id='report-section-title'>
                <div>
                    Skills
                </div>
                <div>
                    Traits
                </div>
                <div>
                   Majors
                </div>
           </div>
           <div id='report-section'>
                <div id='skills' className='report'>
                    {career.skills.map((skill: string) => <div>{skill}</div>)}
                    </div>
                <div id='personalityTraits' className='report'>
                    {career.personalityTraits.map((trait: string) => <div>{trait}</div>)}
                </div>
                <div id='majors' className='report'>
                    {career.potentialMajors.map((major:string) => <div>{major}</div>)}
                </div>
            </div>
    </div>
    );
}