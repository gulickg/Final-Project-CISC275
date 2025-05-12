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
        {careers.map((career: CareerData) => <Report career={career} page='report'></Report>)}-  
    </div>)
}