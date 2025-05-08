import React from "react";
//import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
//import "./AIIntegration.css"; // Create this CSS file
//import {OPENAI_API_KEY} from 'src/Components/APIKey.env'
import OpenAI from "openai"
//import * as readline from 'readline';
//import * as dotenv from 'dotenv';
//import chalk from 'chalk';
//import App from "./App";
import Loader  from "../Components/Loader";
//import { BasicQuestions } from "./BasicQuestions";
import {Question} from "../Components/Detailed-Questions-Folder/DetailedQuestions"
import {Report} from "../Components/Report"
//import {QUESTIONS} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/DetailedQuestions"
//import {keyData} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/App"
import {CareerData} from './CareerData'


export async function AIpage(questions:Question[],questType:string,userKey:string, populateReport:(career:CareerData)=>void){
    let loading:boolean = true;
    console.log('AI');
    console.log("Calling AIpage at", new Date().toISOString());
    let errorCount = 0;


    let Report:CareerData= {type:questType, title:'', description:'', breakdown:[]}
    try{
        //set to what user inputs
        const api= userKey;
        const openai=new OpenAI({
            apiKey: api,
            dangerouslyAllowBrowser:true,
            maxRetries: 0
        });
        let qNaText="";
        for(let i=0; i<questions.length; i++){
            qNaText+=`Question ${questions[i].num}: ${questions[i].question}\nAnswer ${i+1}:${questions[i].answer}\n Tooltip ${questions[i].tooltip}`;
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
        await new Promise(res => setTimeout(res, 1000));
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
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
        //const type=questions[0]?.type||"Uknown";
        Report={questType, ...json};
    }
    catch(error){
        // console.error("Error generating career: ", error);
    }  finally{
        loading = false;
        populateReport(Report);
    }
}

//}