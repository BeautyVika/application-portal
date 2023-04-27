import {UserType} from "../../../store/authReducer";
import {ApplicationType} from "../../../store/applicationReducer";

export const users: Array<UserType> = JSON.parse(localStorage.getItem('users') || '[]')

export const applications: Array<ApplicationType> = JSON.parse(localStorage.getItem('userApplications') || '[]')