import axios from 'axios'

export const currencyAPI = {
    getCurrencyUSD() {
        return axios.get<CurrencyReturnType>('https://www.nbrb.by/api/exrates/rates/431')
    },
    getCurrencyEUR() {
        return axios.get<CurrencyReturnType>('https://www.nbrb.by/api/exrates/rates/451')
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