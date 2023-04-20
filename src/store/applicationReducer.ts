import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

let initialState: Array<ApplicationType> = []

export type ApplicationType = {
    id: string
    email: string
    topic: string
    description: string
    date: string
}

type InitialStateType = typeof initialState

export const applicationsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type){
        case "ADD-APPLICATION":
            return [...state, {...action.newApplication}]
        case "GET-APPLICATIONS":
            return [...action.applications]
    }
    return state
}

export const addApplication = (newApplication: ApplicationType) => {
    return {type: "ADD-APPLICATION", newApplication} as const
}
export const getApplicationsFromLocalStorage = (applications: Array<ApplicationType>) => {
    return {type: "GET-APPLICATIONS", applications} as const
}
//thunks
export const addNewApplication = (newApplication: ApplicationType) => (dispatch: Dispatch) => {
    const applications: Array<ApplicationType> = JSON.parse(localStorage.getItem('userApplications') || '[]')
    localStorage.setItem('userApplications', JSON.stringify([...applications, newApplication]))
    dispatch(addApplication(newApplication))
}
export const getApplications = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const applications: Array<ApplicationType> = JSON.parse(localStorage.getItem('userApplications') || '[]')
    const currentUserEmail = getState().auth.user.email
    if(applications.length > 0) {
        const currentApplications = applications.filter((a) => a.email === currentUserEmail)
        dispatch(getApplicationsFromLocalStorage(currentApplications))
    }
}

type ActionType =
    | ReturnType<typeof addApplication>
    | ReturnType<typeof getApplicationsFromLocalStorage>
