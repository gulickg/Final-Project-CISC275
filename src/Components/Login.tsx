import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css'
import { USER, saveUser, findUser } from './SaveFunctions';
import mascot from '../graphics/mascot.png'

interface LoginProps{
    setUser: (user:USER | null)=>void;
    loadUser: (DA:string[], BA:string[]) => void;
    dAnswers: string[];
    bAnswers: string[];
    setShowLogin: (show: boolean)=>void;
}

export function Login({setUser, loadUser, bAnswers, dAnswers, setShowLogin}: LoginProps):React.JSX.Element{
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [domain, setDomain] = useState<boolean>(false);

    const emailDomains: string[] = [
        "@gmail.com",
        "@icloud.com",
        "@outlook.com",
        "@yahoo.com",
        "@hotmail.com",
        "@qq.com",
        "@protonmail.com",
        "@aol.com",
        "@zoho.com",
        "@mail.com",
        "@udel.edu"
      ];
            

    const [state, setState] = useState<'email'| 'makeAccount'| 'login'>('email');   

    function handleSubmission(Email:string){
        const person:USER | undefined = findUser(Email);
        if (person !== undefined){
            setName(person.name)
            setState('login');
        } else {
            setState('makeAccount');
        }
    }

    function makeAccount(){
        let newUser: USER = {name: name, email:email, basicAnswers:bAnswers, detailedAnswers: dAnswers};
        saveUser(newUser);
        setState('login');
        loadUser(dAnswers, bAnswers);
    }

    function login(){
        const toLog: USER | undefined = findUser(email);
        if (toLog) setUser(toLog);
        let U:USER | undefined = findUser(email);
        if (U){
            loadUser(U.detailedAnswers, U.basicAnswers);
        }
        setShowLogin(false);
    }

    function emailClick(event: React.ChangeEvent<HTMLInputElement>) {
        const entered = event.target.value;
        setEmail(entered);
    
        // Check if the email ends with a valid domain
        const isValidDomain = emailDomains.some((d) => entered.endsWith(d)) && !entered.startsWith("@");
        
        setDomain(isValidDomain); // Update domain state properly
    }
    

    return(<div>
        <div>
        <div id='screen'>
            <div id='overlay'>
            </div>
        </div>
        <div id='screen'>
            <div id='popup'>
                <div id='x-wrapper'>
                    <Button id='close-popup' onClick={() => setShowLogin(false)}>X</Button>
                </div>
                {state === 'email' && <div>
                <Form.Group>
                    <Form.Label>Enter your email address:</Form.Label>
                    <Form.Control
                    value = {email}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => emailClick(event)}/>
                    {/* onChange={() => setDomain(email.includes(emailDomains.map(())))} */}
                </Form.Group>
                <Button className='submission' disabled={!domain} onClick={() => handleSubmission(email)}>Enter</Button>
                <div>{domain ? "Valid Input" : "Invalid Input"}</div>
                </div>}
                {state === 'makeAccount' && <div>
                    <Form.Group>
                    <Form.Label>Your name:</Form.Label>
                    <Form.Control
                    value = {name}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
                </Form.Group>
                <Button className='submission' onClick={()=> makeAccount()}>Make Account</Button>
                </div>}
                {state=== 'login' && <div id='welcome'>
                    <div><img src={mascot} alt='' id='welcome-mascot'/></div>
                    <div>Welcome {name}!</div>
                    <Button className='submission' onClick={()=> login()}>Continue</Button>
                </div>}
            </div>
        </div>
        </div>
    </div>);
}
