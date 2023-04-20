import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../store/authReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {applicationsReducer} from "../store/applicationReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    applications: applicationsReducer,
})


export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

export const AppUseSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// store.subscribe(() => {
//     saveState({
//         user: store.getState().auth.user
//     })
// })

// @ts-ignore
window.store = store