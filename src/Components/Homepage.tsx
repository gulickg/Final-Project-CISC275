import React from 'react'
import './Homepage.css'
import { Description } from './DescriptionBox';

interface HomepageProps{
    setPage: (page:string) => void
}

export function Homepage({setPage}: HomepageProps):React.JSX.Element{
    const basicDescription:string = "This assessment will quickly and efficiently evaluate what career fits your lifestyle and interests best. This assessment is great if you are short for time or do not like longer and more in depth quizzes.";
    const detailedDescription:string = "The following quiz will assess your personality and decide which career fits your lifestyle and interests best. This is a detailed quiz with multiple open-ended questions; you should block out at least fifteen minutes to take this quiz. Please answer as honestly and elaborately as you can.";

    return(<div id='homepage-box'>
        <h1 id='title'>Welcome to the Career Helpi!</h1>
        <div id='content-box'>
            <div className='quiz' id='basic-info'>
                <Description questionType={'Basic'} questionDescription={basicDescription} setPage={setPage}></Description>
            </div>
            <div className='quiz' id='detailed-info'>
                <Description questionType={'Detailed'} questionDescription={detailedDescription} setPage={setPage}></Description>
            </div>
        </div>
    </div>);

}