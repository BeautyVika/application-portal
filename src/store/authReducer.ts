import {Dispatch} from "redux";
import {users} from "../components/common/constants/localStorageConstants";
import {RegistrationType} from "../components/Registration/Registration";
import {v1} from "uuid";
import {LoginType} from "../components/Login/Login";

let initialState = {
    isLoggedIn: false,
    isRegister: false,
    user: {} as UserType,
    info: null
}
export type UserType = {
    id: string
    email: string
    password: string
}
type InitialStateType = {
    isLoggedIn: boolean
    isRegister: boolean
    info: string | null
    user: UserType
}

export const authReducer = (state:InitialStateType  = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-IS-REGISTER":
            return {...state, isRegister: action.isRegister}
        case "SET-CURRENT-USER":
            return {...state, user: action.currentUser}
        case "SET-AUTH-INFO":
            return {...state, info: action.info}
    }
    return state
}

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {type: 'SET-IS-LOGGED', isLoggedIn} as const
}
export const setIsRegister = (isRegister: boolean) => {
    return {type: 'SET-IS-REGISTER', isRegister} as const
}
export const setCurrentUser = (currentUser: UserType) => {
    return {type: 'SET-CURRENT-USER', currentUser} as const
}
export const setAuthInfo = (info: string | null) => {
    return {type: "SET-AUTH-INFO", info} as const
}
//thunks
export const setRegistration = (data: RegistrationType) => (dispatch: Dispatch) => {
    if (users.some(elem => elem.email.toLowerCase() === data.email.toLowerCase())) {
        dispatch(setAuthInfo('This Email already exists'))
    } else {
        const newUser = {id: v1(), email: data.email, password: data.password}
        localStorage.setItem('users', JSON.stringify([...users, newUser]))
        dispatch(setIsRegister(true))
    }
}
export const login = (data: LoginType) => (dispatch: Dispatch) => {
    if (users.length > 0
        && users.some(u => u.email.toLowerCase() === data.email.toLowerCase())
        && users.some(u => u.password.toLowerCase() === data.password.toLowerCase())) {

        localStorage.setItem('user', JSON.stringify({id: v1(), email: data.email, password: data.password}))
        const currentUser = JSON.parse(localStorage.getItem('user') || "{}")
        dispatch(setCurrentUser(currentUser))
        dispatch(setIsLoggedIn(true))
    } else {
        dispatch(setAuthInfo('You are not registered or you have entered data incorrectly'))
    }
}
export const logout = () => (dispatch: Dispatch) =>{
    localStorage.removeItem('user')
    dispatch(setIsLoggedIn(false))
    dispatch(setCurrentUser({id: '', email: '', password: ''}))
}
export const getUser = () => (dispatch: Dispatch) => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || '{}')
    if (Object.keys(userFromLocalStorage).length !== 0) {
        dispatch(setCurrentUser(userFromLocalStorage))
        dispatch(setIsLoggedIn(true))
    }else {
        dispatch(setAuthInfo('You need to be logged in to continue.'))
    }
}

type ActionType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsRegister>
    | ReturnType<typeof setCurrentUser>
    | ReturnType<typeof setAuthInfo>