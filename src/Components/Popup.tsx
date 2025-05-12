import React from 'react'
import './Popup.css'
import { Button } from 'react-bootstrap'

/**
 * Renders a pop-up overlay indicating quiz completion.
 * 
 * This component appears when the user has completed all questions in either the 
 * basic or detailed quiz. It provides a message encouraging the user to review 
 * their answers before submitting and includes a close button to dismiss the pop-up.
 * 
 * @param {PopUpProps} props - the properties passed to the component
 * @param {Function} props.disablePopUp - function to close and disable the pop-up
 * 
 * @returns {React.JSX.Element} the rendered pop-up overlay
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

