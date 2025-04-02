import React from 'react'
import './Homepage.css'
import { Description } from './DescriptionBox';

interface HomepageProps{
    setPage: (page:string) => void
}

export function Homepage({setPage}: HomepageProps):React.JSX.Element{

    return(<div id='homepage-box'>
        <h1 id='title'>Welcome to the Career Helpi!</h1>
        <div id='content-box'>
            <div className='quiz' id='basic-info'>
                <Description questionType={'Basic'} questionDescription={'Description'} setPage={setPage}></Description>
            </div>
            <div className='quiz' id='detailed-info'>
                <Description questionType={'Detailed'} questionDescription={'Description'} setPage={setPage}></Description>
            </div>
        </div>
    </div>);

}