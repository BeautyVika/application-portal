import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../store/authReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {applicationsReducer} from "../store/applicationReducer";
import {profileReducer} from "../store/profileReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    applications: applicationsReducer,
    profile: profileReducer
})


export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

export const AppUseSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// @ts-ignore
window.store = store