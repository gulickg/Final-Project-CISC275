import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Homepage.css'

interface USER{
    name: string
    email:string;
    basicAnswers:string[];
    detailedAnswers:string[]
}

interface LoginProps{
    basicAnswers:string[];
    detailedAnswers:string[];
}

export function Login({basicAnswers, detailedAnswers}: LoginProps):React.JSX.Element{
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
        localStorage.setItem('currentUser', email);
    }
    
    
    function logOut() {
        localStorage.removeItem("currentUser");
        window.location.reload();
    }
    
    function saveUser(user: USER){
        const currentUsers: USER[] = loadUsers().filter((t) => t.email !== user.email);
        saveUsers([user, ...currentUsers])
    }
    
    function saveUsers(users: USER[]){
        localStorage.setItem('USERS', JSON.stringify(users));
    }
    
    
    function loadUsers():USER[]{
        return JSON.parse(localStorage.getItem('USERS') || '[]');
    }

    
    function findUser(email:string): USER | undefined{
        const users:USER[] = loadUsers();
        for (let user of users){
            if (user.email === email){
                return user;
            }
        }
        return undefined;
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
