// import React from "react";
//import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
//import "./AIIntegration.css"; // Create this CSS file
//import {OPENAI_API_KEY} from 'src/Components/APIKey.env'
import OpenAI from "openai"
//import * as readline from 'readline';
//import * as dotenv from 'dotenv';
//import chalk from 'chalk';
//import App from "./App";
// import Loader  from "../Components/Loader";
//import { BasicQuestions } from "./BasicQuestions";
import {Question} from "../Components/Detailed-Questions-Folder/DetailedQuestions"
// import {Report} from "../Components/Report"
//import {QUESTIONS} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/Components/DetailedQuestions"
//import {keyData} from "/Users/gracegulick/Cisc Stuff/Final-Project-CISC275/src/App"
// import {CareerData} from './CareerData'


export async function AIpage(questions:Question[], populateReport:(careerString:string)=>void){
    // let loading:boolean = true;
    console.log('AI');
    console.log("Calling AIpage at", new Date().toISOString());
    let content: string = '';
    try{
        //set to what user inputs
        const api: string | undefined = JSON.parse(localStorage.getItem('MYKEY') || 'null');
        const openai=new OpenAI({
            apiKey: api,
            dangerouslyAllowBrowser:true,
            maxRetries: 0
        });
        let qNaText="";
        for(let i=0; i<questions.length; i++){
            qNaText+=`Question ${questions[i].num}: ${questions[i].question}\nAnswer ${i+1}:${questions[i].answer}\n Tooltip ${questions[i].tooltip}`;
        }
        const prompt = `Generate a list of three career options from the following questions and answers. Make sure to use a Genz tone and 
        format the response as list of valid JSON with the following keys:
        {
        "title": "Career title",
        "description": "Description of given career and what jobs the user could have.",
        "breakdown": "A brief explanation of how the user's answers to the questions affected the given career choice",
        "percentMatch": "A number between 0 and 100 that represents how well the user's answers match the career",
        "skills": "Two relevent skills that the user has that would be useful in the career, formatted as a list of two strings",
        "personalityTraits": "Two unique personality traits that the user has that would be useful in the career, formatted as a list",
        "salary": "The average salary of the career as a string",
        "potentialMajors": "Two potential majors that the user could take to get into the career"
        }
        Return only the list of JSON objects without extra text.

        ${qNaText}`;
        await new Promise(res => setTimeout(res, 1000));
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                role: "user",
                content: prompt
                }, 
                {
                role: "system",
                content: 'You are a helpful career advisor who is helping a user find their ideal career based on a questionnaire. You are friendly and casual, using a GenZ tone.'}
            ]
            });
            content=chatCompletion.choices[0].message?.content||"";
            console.log("AI response: ", content);

    }
    catch(error){
        // console.error("Error generating career: ", error);
    }  finally{
        // loading = false;
        populateReport(content);
    }
}

//}