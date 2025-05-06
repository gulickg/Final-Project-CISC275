import React from 'react'
import './Homepage.css'
import { Description } from './Question-Templates/DescriptionBox';
/*
This is the homepage that holds the descriptions
*/


interface HomepageProps{
    setPage: (page:string) => void
}


/**
 * Renders the app's homepage and the quiz descriptions
 * 
 * @param {HomepageProps} properties - the properties of the homepage
 * @param {Function} properties.setPage - the function to set the app's current page
 * 
 * @returns {React.JSX.Element} the homepage
 */
export function Homepage({setPage}: HomepageProps):React.JSX.Element{
    const basicDescription:string = "This assessment will quickly and efficiently evaluate what career fits your lifestyle and interests best. This assessment is great if you are short for time or do not like longer and more in depth quizzes.";
    const detailedDescription:string = "The following quiz will assess your personality and decide which career fits your lifestyle and interests best. This is a detailed quiz with multiple open-ended questions. Please answer as honestly and elaborately as you can.";

    //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
    let keyData = "";
    const saveKeyData = "MYKEY";
    const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
    if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
    }else{
    console.error("API key not found.");
    }

    return(
    <div id='homepage-box'>
        <h1 id='title'>Welcome to CareerSprout!</h1>
        <div id='homepage-content'>
                <div className='quiz' id='basic-info'>
                    <Description questionType={'Basic'} questionDescription={basicDescription} setPage={setPage}></Description>
                </div>
                <div className="group">
                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                    <input placeholder="Search" type="search" className="input"/>
                </div>
                <div id='hpc'></div>
                <div className='quiz' id='detailed-info'>
                    <Description questionType={'Detailed'} questionDescription={detailedDescription} setPage={setPage}></Description>
                </div>
        </div>
    </div>);

}