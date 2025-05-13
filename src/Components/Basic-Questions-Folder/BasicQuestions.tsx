import React from 'react'
import './BasicQuestions.css'
import '../Basic-Questions-Folder/BasicQuestions.css'
import '../Question-Templates/RadioButtonsQuestion'
import '../Question-Templates/TextInputQuestion'
import { RadioButtonQuestion } from '../Question-Templates/RadioButtonsQuestion'
import { SliderRangeQuestion } from '../Question-Templates/SliderQuestion'
import { SwitchQuestion } from '../Question-Templates/SwitchQuestion'
import { Button } from 'react-bootstrap'
import { AIpage } from '../AIIntegration'
import { CareerData } from '../CareerData'

/**
 * Renders the basic version of the CareerSprout quiz.
 * 
 * This component displays a series of personality and preference questions to help guide 
 * users toward a career fit. The quiz includes radio button, slider, and switch questions, 
 * each with accompanying tooltips to explain their relevance. A progress bar tracks 
 * completion, and the "Submit Responses" button is only enabled when all questions are answered.
 * 
 * @param {BasicProps} props - the properties passed to the component
 * @param {string[]} props.answers - current answers to all questions
 * @param {Function} props.setAnswers - function to update the answers array
 * @param {number} props.completed - number of questions completed so far
 * 
 * @returns {React.JSX.Element} the rendered quiz interface
 */


interface BasicProps {
    answers: string[];
    setAnswers(answers:string[]): void;
    completed: number;
    setPage: (page: string) => void
    setReport: (report: CareerData[], type:string) => void
    apiExists: boolean;
    loading: (load:boolean)=>void;
}


export function BasicQuestions({answers, setAnswers, completed, setPage, setReport, apiExists, loading}: BasicProps):React.JSX.Element{
    const blankAnswers:string[] = ['', '', '', '', '', '', ''];
    
    const populateReport = React.useCallback((careerString:string) => {
            const cleanedString = careerString.replace(/```json\s*|\s*```/g, '');
            console.log(cleanedString);
            const careerList: CareerData[] = JSON.parse(cleanedString);
            console.log(careerList);
            setAnswers(blankAnswers);
            setReport(careerList, 'basic');
            setPage('basicReport');
        }, [setReport, setPage]);
    // constants: tracks the questions completed and the total amount of questions there is
    const totalQuestions = 7;


    interface Question{
        num: number;
        question:string;
        choices: string[];
        answer: string;
        tooltip: string;
    }

    const TOOLTIPS: string[] = React.useMemo(()=> [
        "This helps us understand how important free time and personal interests are to your ideal lifestyle and job.",
        "Your strongest subject can highlight natural strengths and hint at career paths where you might excel.",
        "Your go-to media type can show how you like to absorb information—this is useful for matching learning and working styles.",
        "A fun way to explore your personality traits, which can connect to different work styles and team roles.",
        "This helps determine the kind of social energy you bring to a workplace and what environments might suit you best.",
        "Some careers are solo missions, others are team-based—this question helps narrow down the right fit.",
        "Your comfort with different work settings—like remote vs. in-office or quiet vs. fast-paced—can shape your ideal job match."
    ], []);

    // radio questions
    const RADIOQ: Question[] = React.useMemo(()=> [
        {num: 1, question: "How much time do you usually dedicate per week to hobbies?", choices: ['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours'], answer:answers[0], tooltip: TOOLTIPS[0]},
        {num: 2, question: "Which subject did you perform the best in school?", choices: ['English', 'Math', 'Science', 'Art', 'Social Studies'], answer: answers[1], tooltip: TOOLTIPS[1]},
        {num: 3, question: "What is your preferred form of media?", choices: ['Books', 'Podcasts', 'Movies'], answer: answers[2], tooltip: TOOLTIPS[2]},
        {num: 4, question: "What Hogwarts house do you belong to?", choices: ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], answer: answers[3], tooltip: TOOLTIPS[3]}
    ], [answers, TOOLTIPS]);

    const SLIDERQ: Question[] = React.useMemo(()=> [
        {num: 5, question: "Would you consider yourself an introvert or extrovert?", choices: ['Introvert', 'I\'m a little quiet', 'Ambivert', 'I\'m a little loud', 'Extrovert'], answer: answers[4], tooltip: TOOLTIPS[4]},
        {num: 6, question: "Do you like to work by yourself or in a group?", choices: ['Alone', 'I prefer to be alone', 'I\'ll collaborate', 'I like working with others', 'Team work makes the dream work!'], answer: answers[5], tooltip: TOOLTIPS[5]}
    ], [answers, TOOLTIPS]);


    const SWITCHQ: Question = React.useMemo(()=> ({num: 7, question: "What working environment do you prefer?", choices: ['Flexible Schedule', 'Strict Schedule'], answer: answers[6], tooltip: TOOLTIPS[6]}), [answers, TOOLTIPS]);

    const QUESTIONS: Question[] = React.useMemo(()=> [...RADIOQ, ...SLIDERQ, SWITCHQ], [RADIOQ, SLIDERQ, SWITCHQ]); ;

     // find the percent of questions completed and math for the progress bar
     const progressPercent:number = updatePercents(completed, totalQuestions);
     // let progressBarSize = progressPercent / 100 * 185 > 185 ? 185 : Math.ceil(progressPercent / 100 * 185);
     const size: string = progressPercent + '%';

    // pass to each question: updates the percent for the progress bar
    function updatePercents(completed: number, total: number) {
        return Math.ceil(completed / totalQuestions * 100);
    }


    // update the completed function
    function updateCompleted(qNum: number, newA: string) {
        let temp: string[] = [...answers];
        temp.splice(qNum-1, 1, newA);
        setAnswers(temp);
        updateTaskBar(temp);
    }

    // updates num of questions completed
    function updateTaskBar(temp: string[]){
        let sum: number = 0;
        for (let answer of temp) {
            if (answer !== ''){
                sum++;
            }
        }
        completed = sum;
    }

    const handleSubmit = React.useCallback(() => {
            AIpage(QUESTIONS, populateReport, loading);
        }, [QUESTIONS, populateReport, loading]);

    const submitDisabled = progressPercent === 100 ? apiExists? false: true: true;
    return(<div id='questions-page'>
        <div id='prog-bar'>
                <div id='progress-bar-box'>
                    <div id='wrapper'>
                        <div id='progress-bar' style={{ width: size}}></div>
                </div>
            </div>
        </div>
        <div id='question-sect'>
            <h1 id='dtitle'>Basic Quiz Questions</h1>
            <div id='instructions'>To receive your results, please answer all questions and make sure you've entered your API key!</div>

                {/* <RadioButtonQuestion order={1} question={"How much time do you usually dedicate per week to hobbies?"} choices={['One Hour', 'Two Hours', 'Three Hours', 'Four or More Hours']} addCompleted={addCompleted}></RadioButtonQuestion>
                <RadioButtonQuestion order={2} question={"Which subject did you perform the best in school?"} choices={['English', 'Math', 'Science', 'Art', 'Social Studies']} addCompleted={addCompleted}></RadioButtonQuestion>
                <RadioButtonQuestion order={3} question={"What is your preferred form of media?"} choices={['Books', 'Podcasts', 'Movies']} addCompleted={addCompleted}></RadioButtonQuestion>
                <RadioButtonQuestion order={4} question={"What Hogwarts house do you belong to? If this is not applicable, what house do you think you belong to?"} choices={['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin']} addCompleted={addCompleted}></RadioButtonQuestion> */}
                {RADIOQ.map((rq: Question, index:number) => <RadioButtonQuestion order={rq.num} question={rq.question} choices={rq.choices} addCompleted={updateCompleted} answer={rq.answer} tool={rq.tooltip} key={index}></RadioButtonQuestion>)}

                {SLIDERQ.map((sq: Question, index:number) => <SliderRangeQuestion order={sq.num} question={sq.question} choices={sq.choices} addCompleted={updateCompleted} answer={sq.answer} tool={sq.tooltip} key={index}></SliderRangeQuestion>)}

                <SwitchQuestion order={SWITCHQ.num} question={SWITCHQ.question} choices={SWITCHQ.choices} addCompleted={updateCompleted} answer={SWITCHQ.answer} tool={SWITCHQ.tooltip}></SwitchQuestion>
                
                {/* <SwitchQuestion order={7} question={"What working environment do you prefer?"}></SwitchQuestion> */}
            {!apiExists && <div id='reminder'>Enter an API key to submit</div>}
            <div id='s-wrapper'>
                <div id='sb-wrapper'>
                    <Button id='quiz-submit' disabled={submitDisabled} onClick={handleSubmit}>Submit Responses
                    </Button>
                </div>
            </div>
        </div>
    </div>);
}