import React from 'react';
import { CareerData } from './CareerData';
import { Report } from './Report';
import './ReportPage.css'
import { ReportTemplate } from './ReportTemplate';

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