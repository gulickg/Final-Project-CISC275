import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css'
import { USER, saveUser, findUser } from './SaveFunctions';

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
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                    value = {email}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                </Form.Group>
                <Button onClick={() => handleSubmission(email)}>Enter</Button>
                </div>}
                {state === 'makeAccount' && <div>
                    <Form.Group>
                    <Form.Label>Your name:</Form.Label>
                    <Form.Control
                    value = {name}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
                </Form.Group>
                <Button onClick={()=> makeAccount()}>Make Account</Button>
                </div>}
                {state=== 'login' && <div>
                    Welcome {name}!
                    <Button onClick={()=> login()}>Continue</Button>
                </div>}
            </div>
        </div>
        </div>
    </div>);
}
