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

    const basicSkills:string[] = getSkills(basicReport);
    const detailedSkills:string[] = getSkills(detailedReport);
    const basicTraits:string[] = getTraits(basicReport);
    const detailedTraits:string[] = getTraits(detailedReport);
    
    function getSkills(Report:CareerData[]):string[]{
        console.log(user)
        console.log(Report);
        let skills:string[] = [];
        for (let report of Report){
            for (let skill of report.skills){
                if (!skills.includes(skill)){
                    skills.push(skill);
                }
            }
        }
        console.log(skills);
        return skills;
    }

    function getTraits(Report:CareerData[]):string[]{
        let traits:string[] = [];
        for (let report of Report){
            for (let trait of report.personalityTraits){
                if (!traits.includes(trait)){
                    traits.push(trait);
                }
            }
        }
        return traits;
    }

    return (<div id='profile'>
        <div id='pheader'>{name}'s Career Garden</div>
        <div id='profile-content'>
            <div id='user-profile'>
                <div id='user-info'>
                    Name:
                        <div id='user-name'>Alexis</div>
                    
                    Email:
                        <div id='user-name'>Alexis</div>
                    
                </div>
                <div id='user-skills'>Skills
                        {(detailedSkills.length !== 0 || basicSkills.length !==0) &&
                        <div id='skills'>
                            <div id='basic-skills'>
                                <div id='user-skill'>{basicSkills[0]}</div>
                                <div id='user-skill'>{basicSkills[1]}</div>
                                <div id='user-skill'>{basicSkills[2]}</div>
                            </div>
                            <div id='basic-skills'>
                                <div id='user-skill'>{basicSkills[3]}</div>
                                <div id='user-skill'>{basicSkills[4]}</div>
                                <div id='user-skill'>{basicSkills[5]}</div>
                            </div>
                            <div id='detailed-skills'>
                                <div id='user-skill'>{detailedSkills[0]}</div>
                                <div id='user-skill'>{detailedSkills[1]}</div>
                                <div id='user-skill'>{detailedSkills[2]}</div>
                            </div>
                            <div id='detailed-skills'>
                                <div id='user-skill'>{detailedSkills[3]}</div>
                                <div id='user-skill'>{detailedSkills[4]}</div>
                                <div id='user-skill'>{detailedSkills[5]}</div>
                            </div>
                        </div>}
                    {(detailedSkills.length === 0 || basicSkills.length ===0)  && <div id='user-skill'>Take a quiz to reveal your skills!</div>}
                </div>
                 
                <div id='user-traits'>Personality Traits
                        {(detailedTraits.length !== 0 || basicTraits.length !==0) &&
                        <div id='traits'>
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
                    {(detailedSkills.length === 0 || basicSkills.length ===0)  && <div id='user-trait'>Take a quiz to reveal your traits!</div>}
            </div>
            </div>
            <div id='user-results'></div>
        </div>
    </div>)
}