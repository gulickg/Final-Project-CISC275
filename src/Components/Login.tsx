import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Homepage.css'
import { USER, saveUser, findUser } from './SaveFunctions';

interface LoginProps{
    setUser: (user:USER | null)=>void;
    loadUser: (DA:string[], BA:string[]) => void;
}

export function Login({setUser, loadUser}: LoginProps):React.JSX.Element{
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
        let newUser: USER = {name: name, email:email, basicAnswers:[], detailedAnswers:[]};
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
    }
    

    return(<div>
        {state === 'email' && <div>
        <Form.Group>
            <Form.Label>email:</Form.Label>
            <Form.Control
            value = {email}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
        </Form.Group>
        <Button onClick={() => handleSubmission(email)}>Enter</Button>
        </div>}
        {state === 'makeAccount' && <div>
            <Form.Group>
            <Form.Label>name:</Form.Label>
            <Form.Control
            value = {name}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
        </Form.Group>
        <Button onClick={()=> makeAccount()}>Make Account</Button>
        </div>}
        {state=== 'login' && <div>
            Welcome back, {name}!
            <Button onClick={()=> login()}>Continue</Button>
        </div>}
    </div>);
}
