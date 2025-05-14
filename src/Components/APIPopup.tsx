import React from 'react'
import './Popup.css'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'


interface PopUpProps{
    disablePopUp: ()=>void;
    changeKey: (event: string) => void;
    handleSubmit: () => void;
}

/**
 * Produces a popup where you can submit the API key.
 * 
 * This component takes in two anonymous functions and another function to set and change the API
 * key. The popup is disabled when the X is clicked through the disablePopUp function; the API 
 * key is changed with the changeKey function; the handleSubmit function saves the API key's 
 * submission.
 * 
 * @param {PopUpProps} disablePopUp - anonymous function to disable the popup
 * @param {PopUpProps} handleSubmit - anonymous function to save the API key
 * @param {PopUpProps} changeKey - changes the API key
 * 
 * @returns {React.JSX.Element} the AI integration UI (loading screen and report generation)
 */

export function APIPopup({disablePopUp, handleSubmit, changeKey}:PopUpProps):React.JSX.Element{

    /**
    * Changes the API key
    * 
    * @param {React.ChangeEvent<HTMLInputElement>} event - user inputted API key
    * 
    */
    function mkey(event: React.ChangeEvent<HTMLInputElement>) {
        changeKey(event.target.value);
    }

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
                <Form>
                    <Form.Label>API Key:</Form.Label>
                    <Form.Control type="password" placeholder="Insert API Key Here" onChange={mkey}></Form.Control>
                    <br></br>
                    <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
                    </Form>
            </div>
        </div>
    </div>)
}

