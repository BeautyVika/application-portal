import {Dispatch} from "redux";
import {currencyAPI} from "../api/api";

let initialState: InitialStateType = {
    usd: null,
    eur: null
}
type InitialStateType = {
    usd: null | number
    eur: null | number
}

export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch(action.type){
        case "GET-CURRENCY-USD":
            return {...state, usd: action.usd}
        case "GET-CURRENCY-EUR":
            return {...state, eur: action.eur}
    }
    return state
}

export const getUSD = (usd: null | number) => {
    return {type: 'GET-CURRENCY-USD', usd} as const
}
export const getEUR = (eur: null | number) => {
    return {type: 'GET-CURRENCY-EUR', eur} as const
}

export const getCurrencyUSD = () => (dispatch: Dispatch) => {

    currencyAPI.getCurrencyUSD()
        .then((res) => {
            const currencyUSD = res.data.Cur_OfficialRate
            dispatch(getUSD(currencyUSD))
        })
}

export const getCurrencyEUR = () => (dispatch: Dispatch) => {

    currencyAPI.getCurrencyEUR()
        .then((res) => {
            const currencyEUR = res.data.Cur_OfficialRate
            dispatch(getEUR(currencyEUR))
        })
}

type ActionType =
    | ReturnType<typeof getUSD>
    | ReturnType<typeof getEUR>
