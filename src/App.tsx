import { useState } from 'react';
import './App.css';
import {Navigation} from './Components/Navigation'
import { Homepage } from './Components/Homepage/Homepage';
import { DetailedQuestions } from './Components/Detailed-Questions-Folder/DetailedQuestions';
import { BasicQuestions } from './Components/Basic-Questions-Folder/BasicQuestions';
import { PopUp } from './Components/Popup';
import { Login } from './Components/Login';
import { USER, saveUser } from './Components/SaveFunctions';
import { ReportPage } from './Components/ReportPage';
import { CareerData } from './Components/CareerData';
import { APIPopup } from './Components/APIPopup';
import { ProfilePage } from './Components/ProfilePage';
import {Loader} from './Components/Loader';

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

/**
 * Renders the main App component for the CareerSprout website.
 * 
 * This is the root component responsible for maintaining global state and routing between
 * different pages of the application, including the homepage, basic and detailed quizzes,
 * and login functionality. It tracks user responses, manages login state, controls 
 * pop-up behavior for quiz completion, and stores user data for persistence. Conditional 
 * rendering is used to switch between the homepage, quiz pages, and authentication views.
 * 
 * @returns {React.JSX.Element} the main application interface
 */


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
  const [loading, setLoading] = useState<boolean>(false);

  const [showAPIInput, setShowAPiInput] = useState<boolean>(false);

  const numberDetailedCompleted = detailedAnswers.reduce((ac, cv)=>ac + (cv.length < 10 ? 0 : 1), 0);
  const numberBasicCompleted = basicAnswers.reduce((ac, cv)=>ac + (cv.length === 0 ? 0 : 1), 0);
  const popUpD:boolean = (!detailedDone && numberDetailedCompleted===7);
  const popUpB: boolean = (!basicDone && numberBasicCompleted===7);
  
  const [key, setKey] = useState<string>(keyData); 

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); 
    setShowAPiInput(false); 
  }

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
    if (page === 'profilePage'){
      setPage('homepage');
    }
    setUser(null);
    setDetailedAnswers(['', '', '', '', '', '', '']);
    setBasicAnswers(['', '', '', '', '', '', '']);
    setBasicReport([]);
    setDetailedReport([]);
    setLoggedIn(false);
  }
  

  return (
    <div className="App">
      <div id='app-content'>
      <header id='header'>
        <Navigation setPage={setPage} footer={false} setShowLogin={setShowLogin} loggedIn={loggedIn} logOut={logOut}></Navigation>
      </header>
      <div id='page-content'>
        {/* <ProfilePage user={user}></ProfilePage> */}
        {showLogin && <Login  setUser={setUser} loadUser={loadUser} dAnswers={detailedAnswers} bAnswers={basicAnswers} bReport={basicReport} dReport={detailedReport} setShowLogin={setShowLogin}></Login>}
        {page === 'homepage' && (<Homepage setPage={setPage}></Homepage>)}
        {page === 'basicQuestions' && (<div><BasicQuestions setPage={setPage} answers={basicAnswers} setAnswers={updateBasic} completed={numberBasicCompleted} setReport={updateReport} apiExists={key!==''} loading={setLoading}></BasicQuestions></div>)}
        {page === 'detailedQuestions' && (<div><DetailedQuestions setPage={setPage} answers={detailedAnswers} setAnswers={updateDetailed} completed={numberDetailedCompleted} setReport={updateReport} apiExists={key!==''} loading={setLoading}></DetailedQuestions></div>)}
        {page === 'detailedQuestions' && popUpD && (<PopUp disablePopUp={disablePopUpD}></PopUp>)}
        {page === 'basicQuestions' && popUpB && (<PopUp disablePopUp={disablePopUpB}></PopUp>)}
        {page ==='detailedReport' && (<ReportPage careers={detailedReport} type='etailed'></ReportPage>)}
        {page ==='basicReport' && (<ReportPage careers={basicReport} type='Basic'></ReportPage>)}
        {page ==='profilePage' && (<ProfilePage user={user}></ProfilePage>)}
        {showAPIInput && (<APIPopup disablePopUp={()=>setShowAPiInput(false)} handleSubmit={handleSubmit} changeKey={changeKey}></APIPopup>)}
        {loading && <div>
          <div id='loader'><Loader></Loader></div>
          <div id='screen'>
              <div id='overlay'></div>
          </div>
        </div>}
      </div>
      <footer id='footer'>
        <Navigation setPage={setPage} footer={true} setShowLogin={setShowLogin} loggedIn={loggedIn} logOut={logOut} showAPI={()=>setShowAPiInput(true)}></Navigation>
      </footer>
      </div>
    </div>
    
  );
}

export default App;
