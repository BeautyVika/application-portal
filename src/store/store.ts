import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../store/authReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
    auth: authReducer
})


export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

export const AppUseSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// store.subscribe(() => {
//     saveState({
//         user: store.getState().auth.user
//     })
// })