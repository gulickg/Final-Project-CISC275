import React from 'react'

export function Report(suggestion: string, description: string, breakdown: string, type: string):React.JSX.Element{
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