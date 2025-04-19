// import React, { JSX, useState } from "react";
// import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
// import "./AIIntegration.css"; // Create this CSS file
// //import {OPENAI_API_KEY} from 'src/Components/APIKey.env'
// // import {Configuration, OpenAIApi, ChatCompletionRequestMessage, OpenAI} from "openai"
// import * as readline from 'readline';
// import * as dotenv from 'dotenv';
// import chalk from 'chalk';
// //import App from "./App";
// // import { Loader } from './Loader';
// import { BasicQuestions } from "./BasicQuestions";
// //import detailed/basic answers and questions 




// export function AIpage():JSX.Element{
//     //const [answers, setAnswers]= useState<string[]>([]);
//     const [career, setCareer]=useState<string[]>([]);
//     const [careerGenerated, setCareerGenerated]=useState<boolean>(false);
//     const [questionDetails, setQuestionDetails]=useState<string>("");
//     const [loading, setLoading]=useState<boolean>(false);

//     /*
//     //load api key
//     dotenv.config();
//     const configuration= new Configuration({
//         apiKey:process.env.OPENAI_API_KEY,
//     });
//     const openai= new OpenAIApi(configuration);


//     //initializing readline interface
//     const userInterface=readline.createInterface({
//         input: process.stdin,
//         output:process.stdout,
//     });
// */

//     function handleSubmit(){
//         setLoading(true);
//         try{
//             const apiKey= "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";
//             if(!apiKey){
//                 console.error("API key not found.");
//                 return;
//             }
//             const chatGPT=new OpenAIApi(apiKey);
//             const model=chatGPT.getGenerativeModel({model: "gpt-4-0613"});
//             const prompt= `Generate a career option from the following questions and answers. 
//             Format the response as valid JSON with the following keys:
//             {
//                 "career": "Career title",
//                 "description": "Description of given career",
//                 "breakdown":"Explanation of how each answer to the questions affected the given career choice"
//             }
//             Return only the JSON object without extra getDefaultFormatCodeSettings. `;
//             let basic='';
//             let detailed='';
//             for (let i=0; i<BasicQuestions.length;i++){
//                 basic+= "Question "+i.toString()+". "+BasicQuestions[i]+ '/n'+'Answer '+i.toString()+ ". "+ BasicAnswers[i]+'/n';
//             }
//             const result= await model.generateContent(prompt);
//             const response= await result.response;
//             const text=await response.text();

//             //valid json
//             const jsonStartIndex=text.indexOf('{');
//             const jsonEndIndex=text.indexOf('}')+1;
//             const jsonString=text.substring(jsonStartIndex, jsonEndIndex);
//             const careerData=JSON.parse(jsonString);
//             setCareer(careerData);
//             setCareerGenerated(true);
//         }
//         catch(error){
//             console.error("Error generating recipe: ", error);
//         }finally{
//             setLoading(false);
//         }
//     }
//     return (
//         <div>
//             {loading && <Loader/>}
//             {!loading && !careerGenerated ? (
//                 //stay on questions page with all functional buttons
//             ):(
//                 //create output with a go home button 
//             )}
//         </div>
//     );
// }