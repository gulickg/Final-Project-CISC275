import React from 'react'
import './DetailedQuestions.css'
import '../Basic-Questions-Folder/BasicQuestions.css'
import '../Question-Templates/RadioButtonsQuestion'
import '../Question-Templates/TextInputQuestion'
import { TextInputQuestion } from '../Question-Templates/TextInputQuestion'
import { Button } from 'react-bootstrap'
import { AIpage } from '../AIIntegration'
import { CareerData } from '../CareerData'


export interface Question{
    num: number;
    question:string;
    answer: string;
    tooltip:string;
}

/*
This is the detailed questions page
*/

//interface for the Detailed Page properties
interface DetailedProps{
    answers:string[];
    setAnswers: (answers:string[]) => void
    completed:number;
    setPage: (page: string) => void
    setReport: (report: CareerData[], type:string) => void
    apiExists: boolean;
}

/**
 * Renders the app's detailed questions page
 * 
 * @param {DetailedProps} properties - the properties of the detailed page
 * @param {string[]} properties.answers - the list of the current answers
 * @param {Function} properties.setAnswers - the function to set the app's detailed answers
 * @param {number} properties.completed - the number of completed detailed questions
 * 
 * @returns {React.JSX.Element} - the detailed questions page
 */
export function DetailedQuestions({answers, setAnswers, completed, setPage, setReport, apiExists}: DetailedProps):React.JSX.Element{
    const totalQuestions = 7;

    

    const populateReport = React.useCallback((careerString:string) => {
        const cleanedString = careerString.replace(/```json\s*|\s*```/g, '');
        console.log(cleanedString);
        const careerList: CareerData[] = JSON.parse(cleanedString);
        console.log(careerList);
        setReport(careerList, 'detailed');
        setPage('detailedReport');
    }, [setReport, setPage]);


    interface Question{
        num: number;
        question:string;
        answer: string;
        tooltip: string;
    }

    const TOOLTIPS: string[] = React.useMemo(() => [
        "Your ideal location can reveal lifestyle preferences that connect to values, pace, and type of work you might enjoy.",
        "This helps identify your natural tendencies in team dynamics—are you a leader, a helper, a planner, or something else?",
        "This shows how you handle accountability and whether you prefer independence or guidance in problem-solving.",
        "Your answer highlights what causes you care about and how you approach big-picture thinking and solutions.",
        "This helps uncover how you view impact, innovation, and the kind of thinking that excites you.",
        "Your preference can suggest the type of work culture and setup you'll feel most productive and comfortable in.",
        "This scenario helps explore whether you're drawn to care and service or exploration and originality—both valuable in different careers."
    ], []);

    // list of questions to be mapped onto the page
    const QUESTIONS: Question[] = React.useMemo(() => [
    { num: 1, question: 'If you could live anywhere in the world where would you live and why?', answer: answers[0], tooltip: TOOLTIPS[0] },
    { num: 2, question: 'In group settings, what role do you find yourself taking?', answer: answers[1], tooltip: TOOLTIPS[1] },
    { num: 3, question: 'If a customer/client were to lodge a complaint about a mistake you made, what would you do to fix it? Would you go to your boss, or try and fix it on your own?', answer: answers[2], tooltip: TOOLTIPS[2] },
    { num: 4, question: 'If you could fix one problem in the world, what would it be and how would you fix it?', answer: answers[3], tooltip: TOOLTIPS[3] },
    { num: 5, question: 'What do you think the most useful invention has been so far and why?', answer: answers[4], tooltip: TOOLTIPS[4] },
    { num: 6, question: 'Would you rather work in-person or completely online? State which you would choose and explain why.', answer: answers[5], tooltip: TOOLTIPS[5] },
    { num: 7, question: "Imagine you’re on a forked path. The path to the left has a hospital at the end of it. The path to the right leads to a city of innovation and creativity. Which path do you choose and why?", answer: answers[6], tooltip: TOOLTIPS[6] }
], [answers, TOOLTIPS]);

    //updates the progress bar
    const progressPercent:number = updatePercents(completed, totalQuestions);
    const size: string = progressPercent + '%';

    /**
     * Calculates the percent of questions completed
     * 
     * @param {number} completed - the number of questions that have input
     * @param {number} total - the total number of questions on the page
     * 
     * @returns {React.JSX.Element} - the percent of questions completed
     */
    function updatePercents(completed:number, total:number):number{
        return Math.ceil(completed / totalQuestions * 100);
    }

    /**
     * Updates the saved detailed quiz answers
     * 
     * @param {number} questionNum - the number of the question that has been modified
     * @param {number} total - the new inputted answer
     */
    function updateCompleted(questionNum:number, newAns: string){
        let temp:string[] = [...answers];
        temp.splice(questionNum -1, 1, newAns);
        setAnswers(temp);
        updateTaskBar(temp);
    }

    /**
     * Updates the number of questions completed
     * 
     * @param {string[]} temp - the list of answers
     */
    function updateTaskBar(temp:string[]){
        let sum: number = 0;
        for (let answer of temp){
            if (answer !== ''){
                sum++;
            }
        }
        completed = sum;
    }

    const handleSubmit = React.useCallback(() => {
        AIpage(QUESTIONS, populateReport);
    }, [QUESTIONS, populateReport]);


    const submitDisabled = progressPercent === 100 ? apiExists? false: true: true;



    //creating a variable to hold AIpage function
        return(<div id='questions-page'>
            <div id='prog-bar'>
                <div id='progress-bar-box'>
                    <div id='wrapper'>
                        <div id='progress-bar' style={{ width: size}}></div>
                    </div>
                </div>
            </div>
            <div id='dquestion-sect'>
                {/* <Button id='scroll-down' className='dbutton' onClick={()=> document.getElementById('detailed-submit')?.scrollIntoView()}>
                    <div>↓</div>
                </Button> */}
                <h1 id='dtitle'>Detailed Quiz Questions</h1>
                
                {QUESTIONS.map((q:Question, index:number) => <TextInputQuestion question={q.question} qNumber={q.num} response={updateCompleted} answer={q.answer} key={index} tool={q.tooltip}></TextInputQuestion>)}
                {!apiExists && <div id='reminder'>Enter an API key to submit</div>}
                <div id='s-wrapper'>
                    <div id='sb-wrapper'>
                        <Button id='quiz-submit' disabled={submitDisabled} onClick={handleSubmit}>Submit Responses</Button>
                    </div>
                </div>
            </div>
        </div>);

}