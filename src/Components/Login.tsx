import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css'
import { USER, saveUser, findUser } from './SaveFunctions';
import mascot from '../graphics/mascot.png'
import { CareerData } from './CareerData';

/**
 * Renders the login and account creation popup for CareerSprout.
 * 
 * This component handles user authentication using only an email address and name. 
 * It checks if a user already exists and either proceeds to login or prompts for account creation. 
 * It validates email domains, loads saved quiz answers for returning users, and allows new users 
 * to register with default answer data. The UI dynamically adjusts based on the login state.
 * 
 * @param {LoginProps} props - the properties passed to the component
 * @param {Function} props.setUser - function to set the active user
 * @param {Function} props.loadUser - function to load saved answers for a user
 * @param {string[]} props.dAnswers - current detailed quiz answers
 * @param {string[]} props.bAnswers - current basic quiz answers
 * @param {Function} props.setShowLogin - function to hide the login popup
 * 
 * @returns {React.JSX.Element} the rendered login and account creation interface
 */


interface LoginProps{
    setUser: (user:USER | null)=>void;
    loadUser: (DA:string[], BA:string[], BR:CareerData[], DR:CareerData[]) => void;
    dAnswers: string[];
    bAnswers: string[];
    bReport: CareerData[];
    dReport: CareerData[];
    setShowLogin: (show: boolean)=>void;
}

export function Login({setUser, loadUser, bAnswers, dAnswers, setShowLogin, dReport, bReport}: LoginProps):React.JSX.Element{
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    
    

    const [state, setState] = useState<'email'| 'makeAccount'| 'login'>('email');   

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

    const isValidDomain = emailDomains.some((d) => email.endsWith(d)) && !email.startsWith("@");

    /**
    * Either logs the user in or makes them a new account
    * 
    * @param {string} Email - user-entered email
    * 
    */
    
    function handleSubmission(Email:string){
        const person:USER | undefined = findUser(Email);
        if (person !== undefined){
            setName(person.name)
            setState('login');
        } else {
            setState('makeAccount');
        }
    }

    /**
    * Saves the user to the user's device's local storage, and sets the state to login
    * 
    */

    function makeAccount(){
        let newUser: USER = {name: name, email:email, basicAnswers:bAnswers, detailedAnswers: dAnswers, basicReport: bReport, detailedReport: dReport};
        saveUser(newUser);
        setState('login');
        loadUser(dAnswers, bAnswers, bReport, dReport);
        console.log("User Created: ", newUser);
    }

    /**
    * If defined, logs the user in; otherwise, does not log the user in
    * 
    */

    function login(){
        const toLog: USER | undefined = findUser(email);
        if (toLog) setUser(toLog);
        let U:USER | undefined = findUser(email);
        if (U){
            loadUser(U.detailedAnswers, U.basicAnswers, U.basicReport, U.detailedReport);
        }
        setShowLogin(false);
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
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                </Form.Group>
                <div id='email-error'>
                    {(!isValidDomain || email.length === 0) && <div>Invalid email.</div>}
                </div>
                <Button className='submission' onClick={() => handleSubmission(email)} disabled={!isValidDomain}>Enter</Button>
                </div>}
                {state === 'makeAccount' && <div>
                    <Form.Group>
                    <Form.Label>Your name:</Form.Label>
                    <Form.Control
                    value = {name}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
                </Form.Group>
                <Button className='submission' onClick={()=> makeAccount()} disabled={name.length === 0}>Make Account</Button>
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
