import axios from 'axios'

export const currencyAPI = {
    getCurrency() {
        axios.get('https://www.nbrb.by/api/exrates/currencies[/431]')
    }
}