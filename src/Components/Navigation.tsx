import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import "./Navigation.css"

export function Navigation():React.JSX.Element{
    const [page, setPage] = useState<string>("homepage");

    return(<div id='navbar'>
        <div><Button className='navButton'>Home</Button></div>
        <div><Button className='navButton'>Basic Questions</Button></div>
        <div><Button className='navButton'> Detailed Questions</Button></div>
    </div>);

}