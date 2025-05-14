import React from 'react';
import './ProfilePage.css';
import { USER } from './SaveFunctions';
import { CareerData } from './CareerData';
import {Report} from './Report';

/**
 * If logged in, shows the user's profile page.
 * 
 * This component takes in a user, which is necessary for the profile. If the user has
 * taken a quiz, it will show their top career suggestions on the right side. On the 
 * left, it will show them their strongest skills and personality traits. This information
 * is stored in the user.
 * 
 * @param {ProfilePageProps} user - the user's saved information
 * 
 * @returns {React.JSX.Element} the profile page
 */


interface ProfilePageProps {
    user:USER | null;
}

export function ProfilePage({user}:ProfilePageProps):React.JSX.Element{
    const name:string = user?.name || '';
    const basicReport = React.useMemo(()=>user?.basicReport || [], [user?.basicReport]);
    const detailedReport = React.useMemo(()=>user?.detailedReport || [], [user?.detailedReport]);


    /**
     *  Combines the basic and detailed quiz reports into one list
    **/
    function combinedReports(){
        let newList: CareerData[] = [];
        for (let report of basicReport){
            let newItem:CareerData = {...report, potentialMajors:[...report.potentialMajors], skills:[...report.skills], personalityTraits:[...report.personalityTraits]}
            newList.push(newItem);
        }
        for (let report of detailedReport){
            let newItem:CareerData = {...report, potentialMajors:[...report.potentialMajors], skills:[...report.skills], personalityTraits:[...report.personalityTraits]}
            newList.push(newItem);
        }
        return newList
    }

    const REPORTS = combinedReports();

    const basicSkills:string[] = basicReport.map((career:CareerData) => career.skills).flat();
    const detailedSkills:string[] = detailedReport.map((career:CareerData) => career.skills).flat();
    const basicTraits:string[] = basicReport.map((career:CareerData) => career.personalityTraits).flat();
    const detailedTraits:string[] = detailedReport.map((career:CareerData) => career.personalityTraits).flat();
    

    /**
     * The top careers are shown on your profile.
     * 
     * @returns {CareerData[]} the top three careers
     */
    function getTopCareers(): CareerData[] {
        
            REPORTS.sort((b, a) => a.percentMatch - b.percentMatch);
            return [REPORTS[0], REPORTS[1], REPORTS[2]];

    }

    return (<div id='profile'>
        <div id='pheader'>{name}'s Career Garden</div>
        <div id='profile-content'>
            <div id='user-profile'>
                
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
                    {(detailedSkills.length === 0 && basicSkills.length ===0)  && <div id='user-skill' style={{justifySelf:'center', alignSelf:'center', width:'100%', maxWidth:'none', backgroundColor:'transparent', fontSize:'large', boxShadow:'none', border:'none'}}>Take a quiz to reveal your skills!</div>}
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
                    {(detailedSkills.length === 0 && basicSkills.length ===0)  && <div id='user-trait' style={{justifySelf:'center', alignSelf:'center', width:'100%', maxWidth:'none', backgroundColor:'transparent', fontSize:'large', boxShadow:'none', border:'none'}}>Take a quiz to reveal your traits!</div>}
            </div>
            </div>
            <div id='user-results'>
                <div id='profile-results-title' >Your Top Careers</div>
                {(detailedSkills.length === 0 && basicSkills.length ===0) && <div id='report' style={{justifySelf:'center', alignSelf:'center', width:'100%', maxWidth:'none', fontSize:'large', boxShadow:'none'}}>Take a quiz to see your suggested careers!</div>}
                <div id='profile-results'>
                    {(detailedSkills.length !== 0 || basicSkills.length !==0) && getTopCareers().map((report)=> <Report career={report} page='profile'></Report>)}
                </div>
            </div>
        </div>
    </div>)
}