import React from 'react'
import './Popup.css'
import { Button } from 'react-bootstrap'

/**
 * Produces a popup when the quiz is complete
 * 
 * This component takes in an anonymous function that is used to close the popup after it appears.
 * The popup appears after all questions in the quiz have been answered. The X in the top corner
 * will close the popup when clicked. The popup displays text, explaining that the user may review
 * answers before submitting to the report. 
 * 
 * @param {PopUpProps} disablePopUp - anonymous function to close popup
 * 
 * @returns {React.JSX.Element} a popup box with an x to hide it
 */


interface PopUpProps{
    disablePopUp: ()=>void;
}

export function PopUp({disablePopUp}:PopUpProps):React.JSX.Element{
    return (<div>
        <div id='screen'>
            <div id='overlay'>
            </div>
        </div>
        <div id='screen'>
            <div id='popup'>
                <div id='x-wrapper'>
                    <Button id='close-popup' onClick={disablePopUp}>X</Button>
                </div>
                You have completed all the questions! Feel free to go back and change
                or review your answers and then scroll to the bottom and submit to see your results.
            </div>
        </div>
    </div>)
}