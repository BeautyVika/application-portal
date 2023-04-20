import {Dispatch} from "redux";

let initialState = {
    isLoggedIn: false,
    isRegister: false,
    user: {} as UserType
}
type UserType = {
    id: string
    email: string
    password: string
}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-IS-REGISTER":
            return {...state, isRegister: action.isRegister}
        case "SET-CURRENT-USER":
            return {...state, user: action.user}
    }
    return state
}

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {type: 'SET-IS-LOGGED', isLoggedIn} as const
}
export const setIsRegister = (isRegister: boolean) => {
    return {type: 'SET-IS-REGISTER', isRegister} as const
}
export const setCurrentUser = (user: UserType) => {
    return {type: 'SET-CURRENT-USER', user} as const
}

export const setRegistration = () => (dispatch: Dispatch) => {

}


type ActionType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsRegister>
    | ReturnType<typeof setCurrentUser>