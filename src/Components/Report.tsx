import React from 'react'

export function Report(suggestion: string, description: string, breakdown: string, type: string):React.JSX.Element{
    return(
    <div id='report'>
        <h1 id='title'>{type} Quiz Results</h1>
        <div id='container'>
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
                    {/*ai stuff - do we get rid of?*/}
                </div>
            </div>
        </div>
            <div id="shareButton">
                <button>Share your results</button>
            </div>
    </div>
    );
}