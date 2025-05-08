import React from 'react'
import './Homepage.css'
import { Description } from '../Question-Templates/DescriptionBox';
import HomepageImage from '../../graphics/Homepage.png';
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
export let keyData:string;
export function Homepage({setPage}: HomepageProps):React.JSX.Element{
    const basicDescription:string = "This assessment will quickly and efficiently evaluate what career fits your lifestyle and interests best. This assessment is great if you are short for time or do not like longer and more in depth quizzes.";
    const detailedDescription:string = "The following quiz will assess your personality and decide which career fits your lifestyle best. This is a detailed quiz with multiple open-ended questions. Please answer as honestly and elaborately as you can.";
    //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
    //let keyData = "";
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
        <div id='site-description'>
            CareerSprout's Career assessments are designed to help you grow your
            future prospects. Select a quiz to get started.
        </div>
        <div id='homepage-content'>
                <div className='quiz' id='basic-info'>
                    <Description questionType={'Basic'} questionDescription={basicDescription} setPage={setPage}></Description>
                </div>
                {/* <div className="group">
                    <input placeholder="API key here" type="input" className="input"/>
                </div> */}
                <div>
                    <img id='mascot-homepage' src={HomepageImage} alt=''/>
                </div>
                <div className='quiz' id='detailed-info'>
                    <Description questionType={'Detailed'} questionDescription={detailedDescription} setPage={setPage}></Description>
                </div>
        </div>
    </div>);

}