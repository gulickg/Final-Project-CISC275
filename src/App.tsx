import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  //state to change pages when buttons are clicked
  type page= 'home'|'Detailed Quest Page'| "Basic Quest Page"
  const [currentPage, setCurrentPage]=useState<page>('home');


  const [key, setKey] = useState<string>(keyData); //for api key input
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }
  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


  //function to change the current page to the detailed questions when detailed question button is pressed
  function goToDetailedQuestPage(){
    setCurrentPage('Detailed Quest Page');
  }

  //function to set the current page to the basic question page when the button is clicked
  function gotToBasicQuestPage(){
    setCurrentPage("Basic Quest Page");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Brynn Maleryn 
          Julia was here
          Grace was here
          Alexis Vogt
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>


{/*working on buttons and descriptions*/}
      <div>
        <button className="basicButton" onClick={gotToBasicQuestPage}>Basic Career Assesment</button>
        <div className='basicDescript'>This assessment will quickly and efficiently evaluate what career fits your lifestyle and interests best. This assessment is great if you are short for time or do not like longer and more in depth quizzes. </div>
        <button className="detailedButton" onClick={goToDetailedQuestPage}>Detailed Career Assesment</button>
        <div className="detailedDescript">The following quiz will assess your personality and decide which career fits your lifestyle and interests best. This is a detailed quiz with multiple open-ended questions; you should block out at least fifteen minutes to take this quiz. Please answer as honestly and elaborately as you can. </div>
      </div>

    </div>
  );
}

export default App;
