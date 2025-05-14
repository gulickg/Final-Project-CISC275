import { CareerData } from "./CareerData";

export interface USER{
    name: string
    email:string;
    basicAnswers:string[];
    detailedAnswers:string[]
    basicReport:CareerData[];
    detailedReport:CareerData[];
}

/**
 * Saves the user to the list of users.
 * 
 * This function saves the new user to the list of existing users. The
 * current user is added to the top of the list before it is saved.
 * 
 * @param {USER} user - the user's saved information
 */

export function saveUser(user: USER){
    const currentUsers: USER[] = loadUsers().filter((t) => t.email !== user.email);
    saveUsers([user, ...currentUsers])
}

/**
 * Saves users to the local storage.
 * 
 * This component takes in a list of users, and adds it to the local storage. It
 * 'stringifies' the users, and saves them.
 * 
 * @param {ProfilePageProps} user - the user's saved information
 */

export function saveUsers(users: USER[]){
    localStorage.setItem('USERS', JSON.stringify(users));
}

/**
 * Shows the full list of users in the system.
 * 
 * This component does not take in anything, and only returns the list of
 * users on that device. Note, it will not return every user who has used
 * the website, but only the list of users in the local storage.
 * 
 * @returns {USER[]} list of all users on that user's device
 */

export function loadUsers():USER[]{
    return JSON.parse(localStorage.getItem('USERS') || '[]');
}

/**
 * Finds user with a certain email
 * 
 * This component takes in a user's email, and loads the list of all
 * users on the local storage and searches for the user with that email.
 * Once they are found, the user with the inputted email is returned. If
 * the email is not in the system, it will return undefined.
 *  * 
 * @param {ProfilePageProps} email - email address of a potential user
 * 
 * @returns {React.JSX.Element} the profile page
 */

export function findUser(email:string): USER | undefined{
    const users:USER[] = loadUsers();
    for (let user of users){
        if (user.email === email){
            return user;
        }
    }
    return undefined;
}
