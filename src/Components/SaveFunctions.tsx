import { CareerData } from "./CareerData";

export interface USER{
    name: string
    email:string;
    basicAnswers:string[];
    detailedAnswers:string[]
    basicReport:CareerData[];
    detailedReport:CareerData[];
}

export function saveUser(user: USER){
    const currentUsers: USER[] = loadUsers().filter((t) => t.email !== user.email);
    saveUsers([user, ...currentUsers])
}

export function saveUsers(users: USER[]){
    localStorage.setItem('USERS', JSON.stringify(users));
}


export function loadUsers():USER[]{
    return JSON.parse(localStorage.getItem('USERS') || '[]');
}


export function findUser(email:string): USER | undefined{
    const users:USER[] = loadUsers();
    for (let user of users){
        if (user.email === email){
            return user;
        }
    }
    return undefined;
}
