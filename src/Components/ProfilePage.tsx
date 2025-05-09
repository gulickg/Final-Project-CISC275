import React from 'react';


export function ProfilePage():React.JSX.Element{
    let name: string = 'Name';
    return (<div>
        <div>{name}'s Career Garden</div>
        <div id='profile-content'>
            <div></div>
        </div>
    </div>)
}