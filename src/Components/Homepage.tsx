import React from 'react'
import './Homepage.css'
import { Description } from './DescriptionBox';

export function Homepage():React.JSX.Element{

    return(<div>
        <h1 id='title'>Welcome to the Career Helpi!</h1>
        <div id='content-box'>
            <div className='quiz' id='basic-info'>
                <Description questionType={'Basic'} questionDescription={'Description'}></Description>
            </div>
            <div className='quiz' id='detailed-info'>
            <Description questionType={'Detailed'} questionDescription={'Description'}></Description>
            </div>
        </div>
    </div>);

}