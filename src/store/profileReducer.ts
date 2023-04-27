let initialState: InitialStateType = {
    usd: null
}
type InitialStateType = {
    usd: null | number
}

export const profileReducer = (state = initialState, action: any): InitialStateType => {
    return state
}



export const getCurrencyUSD = () => {}