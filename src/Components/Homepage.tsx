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
                <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
                    <label className="block #024932 text-sm font-bold mb-2" htmlFor="unique-input"
                            >Enter OpenAI API key here</label>
                    <input
                        className="text-sm custom-input w-full px-4 py-2 border #266d56 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:#266d56 hover:shadow-lg hover:#266d56 bg-gray-100"
                        placeholder="API key"
                        type="text"
                        id="api"
                    />
                </div>
                <div id='hpc'></div>
                <div className='quiz' id='detailed-info'>
                    <Description questionType={'Detailed'} questionDescription={detailedDescription} setPage={setPage}></Description>
                </div>
        </div>
    </div>);

}