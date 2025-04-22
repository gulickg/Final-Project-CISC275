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

export function Login():React.JSX.Element{
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [state, setState] = useState<'email'| 'makeAccount'| 'login'>('email');   

    function handleSubmission(name:string, email:string, basicAnswers:string[], detailedAnswers:string[]){
        let userInfo : USER = {name: name, email: email, basicAnswers:basicAnswers, detailedAnswers:detailedAnswers};
        if (findUser(userInfo.email) !== undefined){
            setState('login');
        } else {
            setState('makeAccount');
            saveUser(userInfo);
        }
        window.location.reload();
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

    function compare(){

    }
    
    function findUser(email: string): USER | undefined{
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
        <Button onClick={() => setState('makeAccount')}></Button>
        </div>}
        {state === 'makeAccount' && <div>
            <Form.Group>
            <Form.Label>name:</Form.Label>
            <Form.Control
            value = {name}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
        </Form.Group>
        </div>}
        {state=== 'login' && <div>
            Welcome back, {name}!
            <Button>Continue</Button>
            <Button>Start Fresh</Button>
        </div>}
    </div>);
}
