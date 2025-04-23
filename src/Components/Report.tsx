import React from 'react'

export function Report():React.JSX.Element{
    //let careerSuggestion: string = ""; //this needs to come from the AI
    //let answerBreakdown: string = ""; //list of questions linked to the users answers
    return(
    <div id='report'>
        <h1 id='title'>Quiz Results</h1>
        <div id='container'>
            <div id='box'>
                <div id = 'careerSuggestion'>
                    {/* this comes from the ai */}
                </div>
                <div id = 'careerDescription'>
                    {/* this comes from ai */}
                </div>
            </div>
            <div id='box'>
                <div id='answerBreakdown'>
                    {/*this comes from somewhere else*/}
                </div>
                <div id='ai'>
                    <h2>Still stuck? Follow up with ChatGPT.</h2>
                    {/*ai shit*/}
                </div>
            </div>
        </div>
            <div id="shareButton">
                <button>Share your results</button>
            </div>
    </div>
    );
}