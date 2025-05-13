import React from 'react'
import { Button } from 'react-bootstrap';
import "./Navigation.css"
import Mascot from '../graphics/mascot.png'
import { FlowerHover } from './FlowerHover';
// import { useState } from 'react';

/* 
This is the navigation bar in the header and footer
*/

/**
 * Renders the navigation bar used in the header and footer of the CareerSprout app.
 * 
 * This component displays navigation buttons to access the homepage, basic quiz, 
 * and detailed quiz pages. It conditionally renders either a "Log In" or "Log Out" 
 * button based on authentication state and adapts its layout depending on whether it's 
 * being rendered in the header or footer.
 * 
 * @param {NavigationProps} props - the properties passed to the component
 * @param {Function} props.setPage - function to change the current page
 * @param {boolean} props.footer - whether the navigation is in the footer or not
 * @param {Function} props.setShowLogin - function to display the login component
 * @param {boolean} props.loggedIn - whether a user is currently logged in
 * @param {Function} props.logOut - function to log out the user
 * 
 * @returns {React.JSX.Element} the rendered navigation bar
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
    const className = footer ? '' : 'flower-wrapper';

    return(<div id='navbar'>
       { !footer && <div id='filler'>
        <div id='logo-wrapper'>
        <img src={Mascot} id='header-mascot' alt=''/>
        <div id='site-name'>CareerSprout</div>
        </div>
        </div>}
        <div id='nav-buttons'>
            <div className={className}><Button className='navButton' id='home' onClick={() => setPage('homepage')}>Home</Button> <FlowerHover></FlowerHover></div>
            <div className={className}><Button className='navButton' onClick={() => setPage('basicQuestions')}>Basic Questions</Button><FlowerHover></FlowerHover></div>
            <div className={className}><Button className='navButton' onClick={() => setPage('detailedQuestions')}> Detailed Questions</Button><FlowerHover></FlowerHover></div>
            {footer && <div><Button className='navButton' onClick={showAPI}>Input API Key</Button></div>}
        </div>
        {!footer && !loggedIn &&
        <div id='log-btn-box'><div id='logger' className={className}><Button id='log-in' className='navButton' onClick={()=>setShowLogin(true)}>Log In</Button><FlowerHover></FlowerHover></div></div>
        }
        {!footer && loggedIn &&
        <div id='log-btn-box'>
            <div className={className}><Button className='navButton' onClick={()=>setPage('profilePage')}>View Profile</Button><FlowerHover></FlowerHover></div>
            {loggedIn &&
            <div className={className}><Button id='log-in' className='navButton' onClick={()=>logOut()}>Log Out</Button><FlowerHover></FlowerHover></div>
            }
        </div>
        }
        
    </div>);

}