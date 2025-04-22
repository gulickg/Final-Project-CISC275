import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Button, Form } from 'react-bootstrap';
import {Navigation} from './Components/Navigation'
import { Homepage } from './Components/Homepage';
import { DetailedQuestions } from './Components/DetailedQuestions';
import { BasicQuestions } from './Components/BasicQuestions';
import { Report } from './Components/Report';
import { PopUp } from './Components/Popup';
import { Login } from './Components/Login';
import { USER, saveUser } from './Components/SaveFunctions';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
// let keyData = "";
// const saveKeyData = "MYKEY";
// const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
// if (prevKey !== null) {
//   keyData = JSON.parse(prevKey);
// }

function App() {
  const [page, setPage] = useState<string>("homepage");
  const [detailedAnswers, setDetailedAnswers] = useState<string[]>(['', '', '', '', '', '', '']);
  const [detailedDone, setDetailedDone] = useState<boolean>(false);
  const [user, setUser] = useState<USER | null>(null);
  //const [detailedSubmitted, setDetailedSubmitted] = useState<boolean>(false);
  
  const numberDetailedCompleted = detailedAnswers.reduce((ac, cv)=>ac + (cv.length === 0 ? 0 : 1), 0);
  const popUp:boolean = !detailedDone && numberDetailedCompleted===7;


  function updateCompleted(answers:string[]){
    setDetailedAnswers(answers);
    if (numberDetailedCompleted === 7){
      setDetailedDone(true);
    } if (numberDetailedCompleted !== 7){
      setDetailedDone(false);
    }
    if (user) updateUser(answers);
  }

  function disablePopUp(){
    setDetailedDone(true);
  }

  function loadUser(loadDA:string[], loadBA: string[]){
    updateCompleted(loadDA);
    let basic = loadBA;
  }

  function updateUser(answers:string[]){
    let updatedInfo: USER | null = user;
    if (updatedInfo){
      updatedInfo.detailedAnswers = answers;
      saveUser(updatedInfo);
      setUser(updatedInfo);
    }
  }
  
  // const [key, setKey] = useState<string>(keyData); //for api key input
  
  // //sets the local storage item to the api key the user inputed
  // function handleSubmit() {
  //   localStorage.setItem(saveKeyData, JSON.stringify(key));
  //   window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  // }

  // //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  // function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
  //   setKey(event.target.value);
  // }
 
  return (
    <div className="App" style={{overflow: popUp ? 'hidden' : ''}}>
      {/* <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form> */}
      <div id='app-content'>
      <header id='header'>
        <Navigation setPage={setPage} footer={false}></Navigation>
      </header>
      <div id='page-content'>
      <Login  setUser={setUser} loadUser={loadUser} dAnswers={detailedAnswers} bAnswers={[]}></Login>
        {page === 'homepage' && (<Homepage setPage={setPage}></Homepage>)}
        {page === 'basicQuestions' && (<BasicQuestions></BasicQuestions>)}
        {page === 'detailedQuestions' && (<div><DetailedQuestions answers={detailedAnswers} setAnswers={updateCompleted} completed={numberDetailedCompleted}></DetailedQuestions></div>)}
        {page === 'detailedQuestions' && popUp && (<PopUp disablePopUp={disablePopUp}></PopUp>)}
        {page === 'basicQuestionsReport' && (<Report></Report>)}
      </div>
      <footer id='footer'>
        <Navigation setPage={setPage} footer={true}></Navigation>
      </footer>
      </div>
    </div>
    
  );
}

export default App;
