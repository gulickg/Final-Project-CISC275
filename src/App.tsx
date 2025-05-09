import { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Navigation} from './Components/Navigation'
import { Homepage } from './Components/Homepage/Homepage';
import { DetailedQuestions } from './Components/Detailed-Questions-Folder/DetailedQuestions';
import { BasicQuestions } from './Components/Basic-Questions-Folder/BasicQuestions';
// import { Report } from './Components/Report';
import { PopUp } from './Components/Popup';
import { Login } from './Components/Login';
import { USER, saveUser } from './Components/SaveFunctions';
import { ReportPage } from './Components/ReportPage';
import { CareerData } from './Components/CareerData';
import { APIPopup } from './Components/APIPopup';

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [page, setPage] = useState<string>("homepage");
  const [detailedAnswers, setDetailedAnswers] = useState<string[]>(['', '', '', '', '', '', '']);
  const [detailedDone, setDetailedDone] = useState<boolean>(false);
  const [user, setUser] = useState<USER | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [basicAnswers, setBasicAnswers] = useState<string[]>(['', '', '', '', '', '']);
  const [basicDone, setBasicDone] = useState<boolean>(false);
  const [basicReport, setBasicReport] = useState<CareerData[]>([]);
  const [detailedReport, setDetailedReport] = useState<CareerData[]>([]);

  const [showAPIInput, setShowAPiInput] = useState<boolean>(false);

  const numberDetailedCompleted = detailedAnswers.reduce((ac, cv)=>ac + (cv.length === 0 ? 0 : 1), 0);
  const numberBasicCompleted = basicAnswers.reduce((ac, cv)=>ac + (cv.length === 0 ? 0 : 1), 0);
  const popUpD:boolean = (!detailedDone && numberDetailedCompleted===7);
  const popUpB: boolean = (!basicDone && numberBasicCompleted===7);
  
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variabl\
    setShowAPiInput(false); //closes the api key input box
  }


  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: string) {
    setKey(event);
  }

  function updateReport(report: CareerData[], type:string){
    if (type==='detailed'){
      setDetailedReport(report);
    } if (numberDetailedCompleted !== 7){
      setBasicReport(report);
    }
    if (user) updateUserReport(report, type);
  }


  function updateDetailed(answers:string[]){
    setDetailedAnswers(answers);
    if (numberDetailedCompleted === 7){
      setDetailedDone(true);
    } if (numberDetailedCompleted !== 7){
      setDetailedDone(false);
    }
    if (user) updateUserAnswers(answers, 'detailed');
  }

  function updateBasic(answers: string[]){
    setBasicAnswers(answers);
    if (numberBasicCompleted === 7) {
      setBasicDone(true);
    } else {
      setBasicDone(false);
    }
    if (user) updateUserAnswers(answers, 'basic');
  }

  function disablePopUpD(){
    setDetailedDone(true);
  }
  function disablePopUpB(){
    setBasicDone(true);
  }

  function loadUser(loadDA:string[], loadBA: string[], loadBR: CareerData[], loadDR: CareerData[]){
    updateReport(loadBR, 'basic');
    updateReport(loadDR, 'detailed');
    updateDetailed(loadDA);
    updateBasic(loadBA);
    setLoggedIn(true);
  }

  function updateUserAnswers(answers:string[], quiz:string){
    let updatedInfo: USER | null = user;
    if (updatedInfo){
      if (quiz === 'basic'){
        updatedInfo.basicAnswers = answers;
      } else{ 
      updatedInfo.detailedAnswers = answers;
    }
      saveUser(updatedInfo);
      setUser(updatedInfo);
    }
  }

  function updateUserReport(report:CareerData[], quiz:string){
    let updatedInfo: USER | null = user;
    if (updatedInfo){
      if (quiz === 'basic'){
        updatedInfo.basicReport = report;
      } else{ 
      updatedInfo.detailedReport = report;
    }
      saveUser(updatedInfo);
      setUser(updatedInfo);
    }
  }

  function logOut(){
    setUser(null);
    setDetailedAnswers(['', '', '', '', '', '', '']);
    setLoggedIn(false);
  }
  

  return (
    <div className="App">
      <div id='app-content'>
      <header id='header'>
        <Navigation setPage={setPage} footer={false} setShowLogin={setShowLogin} loggedIn={loggedIn} logOut={logOut}></Navigation>
      </header>
      <div id='page-content'>
        {showLogin && <Login  setUser={setUser} loadUser={loadUser} dAnswers={detailedAnswers} bAnswers={basicAnswers} bReport={basicReport} dReport={detailedReport} setShowLogin={setShowLogin}></Login>}
        {page === 'homepage' && (<Homepage setPage={setPage}></Homepage>)}
        {page === 'basicQuestions' && (<div><BasicQuestions setPage={setPage} answers={basicAnswers} setAnswers={updateBasic} completed={numberBasicCompleted} setReport={updateReport} apiExists={key!==''}></BasicQuestions></div>)}
        {page === 'detailedQuestions' && (<div><DetailedQuestions setPage={setPage} answers={detailedAnswers} setAnswers={updateDetailed} completed={numberDetailedCompleted} setReport={updateReport} apiExists={key!==''}></DetailedQuestions></div>)}
        {page === 'detailedQuestions' && popUpD && (<PopUp disablePopUp={disablePopUpD}></PopUp>)}
        {page === 'basicQuestions' && popUpB && (<PopUp disablePopUp={disablePopUpB}></PopUp>)}
        {page ==='detailedReport' && (<ReportPage careers={detailedReport} type='detailed'></ReportPage>)}
        {page ==='basicReport' && (<ReportPage careers={basicReport} type='basic'></ReportPage>)}
        {showAPIInput && (<APIPopup disablePopUp={()=>setShowAPiInput(false)} handleSubmit={handleSubmit} changeKey={changeKey}></APIPopup>)}
      </div>
      <footer id='footer'>
        <Navigation setPage={setPage} footer={true} setShowLogin={setShowLogin} loggedIn={loggedIn} logOut={logOut} showAPI={()=>setShowAPiInput(true)}></Navigation>
      </footer>
      </div>
    </div>
    
  );
}

export default App;
