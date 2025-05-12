import React from 'react'
import "./Report.css"

/**
 * Renders the final results page for a completed CareerSprout quiz.
 * 
 * This component displays the user's career suggestion along with a description and a breakdown
 * of how the result was determined. It dynamically updates based on the type of quiz completed 
 * (e.g., "Basic" or "Detailed") and presents the information in a collapsible section for clarity.
 * 
 * @param {string} suggestion - the career suggestion returned by the AI model
 * @param {string} description - a brief explanation of the suggested career
 * @param {string} breakdown - a detailed summary of how the user's responses contributed to the suggestion
 * @param {string} type - the type of quiz taken ("Basic" or "Detailed")
 * 
 * @returns {React.JSX.Element} the rendered report view for quiz results
 */


export function Report(suggestion: string, description: string, breakdown: string, type: string):React.JSX.Element{
    return(
    <div id='report'>
        <h1 id='title'>{type} Quiz Results</h1>
        <div id="dropdown">
            <span>Your career suggestion is {suggestion}</span>
            <div id="dropdown-content">
                <p>{description}</p>
                <p>{breakdown}</p>
            </div>
        </div>
        {/* <div id='container'>
            <div id='box'>
                <div id = 'careerSuggestion'>
                    {suggestion}
                </div>
                <div id = 'careerDescription'>
                    {description}
                </div>
            </div>
            <div id='box'>
                <div id='answerBreakdown'>
                    {breakdown}
                </div>
                <div id='ai'>
                    <h2>Still stuck? Follow up with ChatGPT.</h2>
                    *ai stuff - do we get rid of?*
                </div>
            </div>
        </div>
            <div id="shareButton">
                <button>Share your results</button>
            </div>
            </div> */}
    </div>
    );
}