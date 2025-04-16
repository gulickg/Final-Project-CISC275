import React from 'react'
import './Popup.css'
import { Button } from 'react-bootstrap'


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

