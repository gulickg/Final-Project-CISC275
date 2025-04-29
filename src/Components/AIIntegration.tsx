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
//import {QUESTIONS} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/DetailedQuestions"

class Career{
    title:string;
    description:string;
    breakdown:string;
    type:string;
    constructor(title:string, description:string, breakdown:string, type:string){
        this.title=title;
        this.description=description;
        this.breakdown=breakdown;
        this.type=type;
    }
}

export async function AIpage({questions}: {questions:Question[]}){
    //const [answers, setAnswers]= useState<string[]>([]);
   // const [careerDescription, setCareerDescription]=useState<string>("");
    //const [careerGenerated, setCareerGenerated]=useState<boolean>(false);
   // const [answerBreakdown, setAnswerBreakdown]=useState<string>("");
    //const [loading, setLoading]=useState<boolean>(false);

    //const [career, setCareer]=useState<Career|null>(null);
//function to be used in detailed and basic question files
    //function handleSubmit(){
        //setLoading(true);
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
            const jsonEndIndex=content.lastIndexOf('}')+1;
            const json=JSON.parse(content.substring(jsonStartIndex, jsonEndIndex));
            //type is throwing error because there is not type field yet on object string
            const type=questions[0]?.type||"Uknown";
            const careerData:Career={...json, type};
            Report(careerData!.title, careerData!.description, careerData!.breakdown, careerData!.type);
        }
        catch(error){
            console.error("Error generating career: ", error);
        }  
    }

//}