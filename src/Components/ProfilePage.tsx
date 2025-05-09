import React from 'react';
import './ProfilePage.css';
import { USER } from './SaveFunctions';
import { CareerData } from './CareerData';


interface ProfilePageProps {
    user:USER | null;
}

export function ProfilePage({user}:ProfilePageProps):React.JSX.Element{
    const name:string = user?.name || '';
    const email:string = user?.email || '';
    const basicReport = user?.basicReport || [];
    const detailedReport = user?.detailedReport || [];

    // const basicSkills=['coolness', 'intelligence', 'creativity'];
    // const detailedSkills=['coolness', 'intelligence', 'creativity'];
    // const basicTraits=['coolness', 'intelligence', 'creativity'];
    // const detailedTraits=['coolness', 'intelligence', 'creativity'];

    const basicSkills:string[] = basicReport.map((career:CareerData) => career.skills).flat();
    const detailedSkills:string[] = detailedReport.map((career:CareerData) => career.skills).flat();
    const basicTraits:string[] = basicReport.map((career:CareerData) => career.personalityTraits).flat();
    const detailedTraits:string[] = detailedReport.map((career:CareerData) => career.personalityTraits).flat();
    

    return (<div id='profile'>
        <div id='pheader'>{name}'s Career Garden</div>
        <div id='profile-content'>
            <div id='user-profile'>
                <div id='user-info'>
                    <div id='info-title'>Name:</div>
                    <div id='info-content'>{name}</div>
                </div>
                <div id='user-skills'>Skills
                        {(detailedSkills.length !== 0 || basicSkills.length !==0) &&
                        <div id='skills'>
                            {basicSkills.length !== 0 && <div>
                                <div id='basic-skills'>
                                    <div id='user-trait'>{basicSkills[0]}</div>
                                    <div id='user-trait'>{basicSkills[1]}</div>
                                    <div id='user-trait'>{basicSkills[2]}</div>
                                </div>
                                <div id='basic-skills'>
                                    <div id='user-trait'>{basicSkills[3]}</div>
                                    <div id='user-trait'>{basicSkills[4]}</div>
                                    <div id='user-trait'>{basicSkills[5]}</div>
                                </div>
                            </div>}
                            {detailedSkills.length !== 0 &&<div>
                                <div id='detailed-skills'>
                                    <div id='user-trait'>{detailedSkills[0]}</div>
                                    <div id='user-trait'>{detailedSkills[1]}</div>
                                    <div id='user-trait'>{detailedSkills[2]}</div>
                                </div>
                                <div id='detailed-skills'> 
                                    <div id='user-trait'>{detailedSkills[3]}</div>
                                    <div id='user-trait'>{detailedSkills[4]}</div>
                                    <div id='user-trait'>{detailedSkills[5]}</div>
                                </div>
                            </div>}
                        </div>}
                    {(detailedSkills.length === 0 && basicSkills.length ===0)  && <div id='user-skill'>Take a quiz to reveal your skills!</div>}
                </div>
                 
                <div id='user-traits'>Personality Traits
                        {(detailedTraits.length !== 0 || basicTraits.length !==0) &&
                        <div id='traits'>
                            {basicSkills.length !== 0 && <div>
                                <div id='basic-traits'>
                                    <div id='user-trait'>{basicTraits[0]}</div>
                                    <div id='user-trait'>{basicTraits[1]}</div>
                                    <div id='user-trait'>{basicTraits[2]}</div>
                                </div>
                                <div id='basic-traits'>
                                    <div id='user-trait'>{basicTraits[3]}</div>
                                    <div id='user-trait'>{basicTraits[4]}</div>
                                    <div id='user-trait'>{basicTraits[5]}</div>
                                </div>
                            </div>}
                            {detailedSkills.length !== 0 &&<div>
                                <div id='detailed-traits'>
                                    <div id='user-trait'>{detailedTraits[0]}</div>
                                    <div id='user-trait'>{detailedTraits[1]}</div>
                                    <div id='user-trait'>{detailedTraits[2]}</div>
                                </div>
                                <div id='detailed-traits'> 
                                    <div id='user-trait'>{detailedTraits[3]}</div>
                                    <div id='user-trait'>{detailedTraits[4]}</div>
                                    <div id='user-trait'>{detailedTraits[5]}</div>
                                </div>
                            </div>}
                        </div>}
                    {(detailedSkills.length === 0 && basicSkills.length ===0)  && <div id='user-trait'>Take a quiz to reveal your traits!</div>}
            </div>
            </div>
            <div id='user-results'></div>
        </div>
    </div>)
}