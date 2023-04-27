import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";
import {applications} from "../components/common/constants/localStorageConstants";

let initialState: Array<ApplicationType> = []

export type ApplicationType = {
    id: string
    email: string
    topic: string
    description: string
    date: Date
}

type InitialStateType = typeof initialState

export const applicationsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type){
        case "ADD-APPLICATION":
            return [...state, {...action.newApplication}]
        case "GET-APPLICATIONS":
            return [...action.applications]
        case "EDIT-APPLICATIONS":
            return state.map(app => app.id === action.id
                ? {id: app.id, email: app.email, ...action.editApplication}
                : app)
    }
    return state
}

export const addApplication = (newApplication: ApplicationType) => {
    return {type: "ADD-APPLICATION", newApplication} as const
}
export const getApplicationsFromLocalStorage = (applications: Array<ApplicationType>) => {
    return {type: "GET-APPLICATIONS", applications} as const
}
export const editApplication = (id: string, editApplication: Omit<ApplicationType, 'id' | 'email'>) => {
    return {type: "EDIT-APPLICATIONS", id, editApplication} as const
}
//thunks
export const addNewApplication = (newApplication: ApplicationType) => (dispatch: Dispatch) => {
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

export const deleteApplication = (id: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const applications: Array<ApplicationType> = JSON.parse(localStorage.getItem('userApplications') || '[]')
    const currentUserEmail = getState().auth.user.email

    const applicationsAfterDelete = applications.filter(a => a.id !== id)
    const newApplications = applicationsAfterDelete.filter(a => a.email === currentUserEmail)
    localStorage.setItem('userApplications', JSON.stringify([...applicationsAfterDelete]))
    dispatch(getApplicationsFromLocalStorage(newApplications))
}
export const updateApplication = (id: string, data: Omit<ApplicationType, 'id' | 'email'>) =>
    (dispatch: Dispatch) => {

        localStorage.setItem('userApplications', JSON.stringify(applications.map(app => app.id === id ? {...app, ...data}: app)))
        dispatch(editApplication(id, data))
    }

type ActionType =
    | ReturnType<typeof addApplication>
    | ReturnType<typeof getApplicationsFromLocalStorage>
    | ReturnType<typeof editApplication>
