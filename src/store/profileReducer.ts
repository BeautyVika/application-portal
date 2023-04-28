import {Dispatch} from "redux";
import {currencyAPI, weatherAPI} from "../api/api";

let initialState: InitialStateType = {
    usd: 0,
    eur: 0,
    temp: 0,
}
type InitialStateType = {
    usd: number
    eur: number
    temp: number
}

export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch(action.type){
        case "GET-CURRENCY-USD":
            return {...state, usd: action.usd}
        case "GET-CURRENCY-EUR":
            return {...state, eur: action.eur}
        case "GET-WEATHER":
            return {...state, temp: action.temp}

    }
    return state
}

export const getUSD = (usd: number) => {
    return {type: 'GET-CURRENCY-USD', usd} as const
}
export const getEUR = (eur: number) => {
    return {type: 'GET-CURRENCY-EUR', eur} as const
}
export const getWeather = (temp: number) => {
    return {type: 'GET-WEATHER', temp} as const
}

export const getCurrencyUSD = () => (dispatch: Dispatch) => {

    currencyAPI.getCurrencyUSD()
        .then((res) => {
            dispatch(getUSD(res.data.Cur_OfficialRate))
        })
}

export const getCurrencyEUR = () => (dispatch: Dispatch) => {

    currencyAPI.getCurrencyEUR()
        .then((res) => {
            dispatch(getEUR(res.data.Cur_OfficialRate))
        })
}

export const getWeatherInMinsk = () => (dispatch: Dispatch) => {

    weatherAPI.getWeather()
        .then((res) => {
            console.log(res.data)
            dispatch(getWeather(res.data.main.temp))
        })
}

type ActionType =
    | ReturnType<typeof getUSD>
    | ReturnType<typeof getEUR>
    | ReturnType<typeof getWeather>

