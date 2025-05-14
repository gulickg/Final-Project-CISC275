import React from 'react';
import { CareerData } from './CareerData';
import './ReportPage.css'
import { ReportTemplate } from './ReportTemplate';

/**
 * Renders the final results page for a completed CareerSprout quiz.
 * 
 * This component takes in the careers and type of question. With this, it creates the
 * Report Page. The Report Page consists of a list of careers, using the type to create
 * the title for the Report Page. The careers are displayed through the career report,
 * which is generated per career.
 * 
 * @param {CareerData[]} careers - the career suggestions
 * @param {string} type - either Detailed or Basic
 * 
 * @returns {React.JSX.Element} the rendered report view for quiz results
 */

interface ReportPageProps {
    careers: CareerData[];
    type: string;
}

export function ReportPage({careers, type}:ReportPageProps): React.JSX.Element{
    return(<div id='report-page'>
        <h1 id='reportTitle'>{type} Career Report</h1>
        <div id='report-display'>
        {careers.map((career: CareerData) => <ReportTemplate career={career}></ReportTemplate>)} 
        </div>
    </div>)
}