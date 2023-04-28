import axios from 'axios'

export const currencyAPI = {
    getCurrencyUSD() {
        return axios.get<CurrencyReturnType>('https://www.nbrb.by/api/exrates/rates/431')
    },
    getCurrencyEUR() {
        return axios.get<CurrencyReturnType>('https://www.nbrb.by/api/exrates/rates/451')
    }
}

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export const weatherAPI = {
    getWeather(){
        return instance.get('weather?q=Minsk&appid=de7319e3b6e6e2c0cf78088a9890842b&units=metric')
    }
}

export type CurrencyReturnType = {
    Cur_ID: number
    Date: string,
    Cur_Abbreviation: string,
    Cur_Scale: number,
    Cur_Name: string,
    Cur_OfficialRate: number
}