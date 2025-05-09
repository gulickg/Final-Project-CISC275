import React from 'react'
import { Button } from 'react-bootstrap';
import "./Navigation.css"
import Mascot from '../graphics/mascot.png'
import { useState } from 'react';

/* 
This is the navigation bar in the header and footer
*/

interface NavigationProps {
    setPage: (page: string) => void
    footer: boolean;
    setShowLogin: (show:boolean) => void;
    loggedIn:boolean;
    logOut: () => void;
    showAPI?:()=> void;
}



export function Navigation({setPage, footer, setShowLogin, loggedIn, logOut, showAPI}: NavigationProps):React.JSX.Element{
    return(<div id='navbar'>
       { !footer && <div id='filler'>
        <div id='logo-wrapper'>
        <img src={Mascot} id='header-mascot' alt=''/>
        <div id='site-name'>CareerSprout</div>
        </div>
        </div>}
        <div id='nav-buttons'>
        <div><Button className='navButton' onClick={() => setPage('homepage')}>Home</Button></div>
        <div><Button className='navButton' onClick={() => setPage('basicQuestions')}>Basic Questions</Button></div>
        <div><Button className='navButton' onClick={() => setPage('detailedQuestions')}> Detailed Questions</Button></div>
        {footer && <div><Button className='navButton' onClick={showAPI}>Input API Key</Button></div>}
        </div>
        {!footer && !loggedIn &&
        <div id='log-btn-box'><Button id='log-in' className='navButton' onClick={()=>setShowLogin(true)}>Log In</Button></div>
        }
        {!footer && loggedIn &&
        <div id='log-btn-box'><Button id='log-in' className='navButton' onClick={()=>logOut()}>Log Out</Button></div>
        }
    </div>);

}