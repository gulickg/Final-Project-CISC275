import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface USER{
    name: string
    email:string;
    basicAnswers:string[];
    detailedAnswers:string[]
}

function handleSubmission(name:string, email:string, basicAnswers:string[], detailedAnswers:string[]){
    let userInfo : USER = {name: name, email: email, basicAnswers:basicAnswers, detailedAnswers:detailedAnswers};
    if (findUser(userInfo.email) !== undefined){
        localStorage.setItem('currentUser', email);
    } else {
        
    }
    window.location.reload();
}

function checkStatus(){
    return localStorage.getItem('currentUser');
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

function findUser(email: string): USER | undefined{
    const users:USER[] = loadUsers();
    for (let user of users){
        if (user.email === email){
            return user;
        }
    }
    return undefined;
}