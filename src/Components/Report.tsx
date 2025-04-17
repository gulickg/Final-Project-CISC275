import React from 'react'

/*
This is where the report template will go.
*/


export function Report():React.JSX.Element{
    let careerSuggestion: string = ""; //this needs to come from the AI
    let answerBreakdown: string = ""; //list of questions linked to the users answers
    return(
    <div id='report'>
        <h1 id='title'>Quiz Results</h1>
        <div id='quiz output'>
                <h2>Career Suggestion</h2>
                <p>{careerSuggestion}</p>
                <h2>Answer Breakdown</h2>
                <p>{answerBreakdown}</p>
                <h2>Still stuck? Follow up with ChatGPT.</h2>
                {//how to do AI Integration
}
            </div>
            <div id="shareButton">
                <button>Share your results</button>
            </div>
    </div>
    );
}