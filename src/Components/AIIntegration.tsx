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
import {Question} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/DetailedQuestions"
import {Report} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/Report"
import {Career} from 
//import {QUESTIONS} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/DetailedQuestions"




export function AIpage(questions:Question[]){
    //const [answers, setAnswers]= useState<string[]>([]);
   // const [careerDescription, setCareerDescription]=useState<string>("");
    const [careerGenerated, setCareerGenerated]=useState<boolean>(false);
   // const [answerBreakdown, setAnswerBreakdown]=useState<string>("");
    const [loading, setLoading]=useState<boolean>(false);

    interface Career{
        title:string;
        description:string;
        breakdown:string;
        type:string=questions.type;
        //does not work rn but might throw an error in the future due to the format of the chat gpt prompt
    }

    const [career, setCareer]=useState<Career|null>(null);

    async function handleSubmit(){
        setLoading(true);
        try{
            //set to what user inputs
            const api= "API_KEY_HERE";
            if(!api){
                console.error("API key not found.");
                return;
            }
            const openai=new OpenAI({
                apiKey: api,
            });
            let qNaText="";
            for(let i=0; i<questions.length; i++){
                qNaText+='Question ${questions[i].num: ${questions[i].question}\nAnswer ${i+1}:${questions[i].answers\n';
            }
            const prompt = `Generate a career option from the following questions and answers. Make sure to use a Genz tone and 
format the response as valid JSON with the following keys:
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

    Report(career!.title, career!.description, career!.breakdown);

}