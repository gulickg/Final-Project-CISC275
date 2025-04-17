import React, { JSX, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
//import "./AIIntegration.css"; // Create this CSS file
//import {OPENAI_API_KEY} from 'src/Components/APIKey.env'
import OpenAI from "openai"
//import * as readline from 'readline';
//import * as dotenv from 'dotenv';
//import chalk from 'chalk';
//import App from "./App";
import { Loader } from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/Loader";
import { BasicQuestions } from "./BasicQuestions";
import {Report} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/Report"



export function AIpage(questions: string[], answers:string[]):JSX.Element{
    //const [answers, setAnswers]= useState<string[]>([]);
   // const [careerDescription, setCareerDescription]=useState<string>("");
    const [careerGenerated, setCareerGenerated]=useState<boolean>(false);
   // const [answerBreakdown, setAnswerBreakdown]=useState<string>("");
    const [loading, setLoading]=useState<boolean>(false);

    interface Career{
        title:string;
        description:string;
        breakdown:string;
    }
    const [career, setCareer]=useState<Career|null>(null);

    /*
    //load api key
    dotenv.config();
    const configuration= new Configuration({
        apiKey:process.env.OPENAI_API_KEY,
    });
    const openai= new OpenAIApi(configuration);


    //initializing readline interface
    const userInterface=readline.createInterface({
        input: process.stdin,
        output:process.stdout,
    });
*/

    async function handleSubmit(){
        setLoading(true);
        try{
            //set to what user inputs
            const api= "API_KEY_HERE";
            if(!api){
                console.error("API key not found.");
                return;
            }
            
            //const configuration= new Configuration({apiKey});
            const openai=new OpenAI({
                apiKey: api,
            });
            let qNaText="";
            for(let i=0; i<questions.length; i++){
                qNaText+='Question ${i+1}: ${questions[i]}\nAnswer ${i+1}:${answers[i]\n';
            }
            const prompt = `Generate a career option from the following questions and answers. 
Format the response as valid JSON with the following keys:
{
  "title": "Career title",
  "description": "Description of given career and what jobs the user could have.",
  "breakdown": "Explanation of how each answer to the questions affected the given career choice, in a number-ordered list."
}
Return only the JSON object without extra text.

            ${qNaText}`;
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                  {
                    role: "user",
                    content: prompt
                  }
                ]
              });
              const content=chatCompletion.choices[0].message?.content||"";
              
           /*
            let basic='';
            let detailed='';
            for (let i=0; i<BasicQuestions.length;i++){
                basic+= "Question "+i.toString()+". "+BasicQuestions[i]+ '/n'+'Answer '+i.toString()+ ". "+ BasicAnswers[i]+'/n';
            }
            
            const result= await model.generateContent(prompt);
            const response= await result.response;
            const text=await response.text();
            */

            //valid json
            const jsonStartIndex=content.indexOf('{');
            const jsonEndIndex=content.indexOf('}')+1;
            const jsonString=content.substring(jsonStartIndex, jsonEndIndex);
            const careerData=JSON.parse(jsonString);
            setCareer(careerData);
            setCareerGenerated(true);
        }
        catch(error){
            console.error("Error generating recipe: ", error);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div>
            {loading && <Loader/>}
            {!loading && !careerGenerated ? (
                //stay on questions page with all functional buttons
                <QuestionsPage />
            ):(
                <div id='report'>
                    <h1 id='title'>Quiz Results</h1>
                    <div id='quiz output'>
                        <h2>Career Suggestion</h2>
                        <p>{career?.title}</p>
                        <p>{career?.description}</p>
                        <h2>Answer Breakdown</h2>
                        <p>{career?.breakdown}</p>
                        <h2>Still stuck? Follow up with ChatGPT.</h2>
                    </div>
                        <div id="shareButton">
                            <button>Share your results</button>
                        </div>
                    </div>
                
            )}
        </div>
    );
}