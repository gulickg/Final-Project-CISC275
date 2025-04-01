import React from 'react'
import './Homepage.css'

export function Homepage():React.JSX.Element{
    return(<div>
        <h1 id='title'>Welcome to the Career Helpi!</h1>
        <div id='content-box'>
            <div className='quiz' id='basic-info'>Basic Quiz</div>
            <div className='quiz' id='detailed-info'>Detailed Quiz</div>
        </div>
    </div>);

}