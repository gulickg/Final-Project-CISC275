import React from 'react';
import { CareerData } from './CareerData';
import { Report } from './Report';

interface ReportPageProps {
    careers: CareerData[];
    type: string;
}

export function ReportPage({careers, type}:ReportPageProps): React.JSX.Element{
    return(<div>
        <h1 id='reportTitle'>{type} Career Report</h1>
        {careers.map((career: CareerData) => <Report title={career.title} breakdown={career.breakdown} description={career.description} percentMatch={career.percentMatch} skills={career.skills} salary={career.salary} personalityTraits={career.personalityTraits} potentialMajors={career.potentialMajors}></Report>)}-  
    </div>)
}