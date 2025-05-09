import React from 'react'
import './Popup.css'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'


interface PopUpProps{
    disablePopUp: ()=>void;
    changeKey: (event: string) => void;
    handleSubmit: () => void;
}

export function APIPopup({disablePopUp, handleSubmit, changeKey}:PopUpProps):React.JSX.Element{

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

