import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import "./Navigation.css"

interface NavigationProps {
    setPage: (page: string) => void
}

export function Navigation({setPage}: NavigationProps):React.JSX.Element{

    return(<div id='navbar'>
        <div><Button className='navButton' onClick={() => setPage('homepage')}>Home</Button></div>
        <div><Button className='navButton' onClick={() => setPage('basicQuestions')}>Basic Questions</Button></div>
        <div><Button className='navButton' onClick={() => setPage('detailedQuestions')}> Detailed Questions</Button></div>
    </div>);

}