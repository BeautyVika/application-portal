import {UserType} from "../../../store/authReducer";

export const users: Array<UserType> = JSON.parse(localStorage.getItem('users') || '[]')

