import React, {useEffect} from "react";
import {AppUseSelector, useAppDispatch} from "../../store/store";
import {getCurrencyEUR, getCurrencyUSD, getWeatherInMinsk} from "../../store/profileReducer";
import {useNavigate} from "react-router-dom";

export const Profile = () => {

    const usd = AppUseSelector(state => state.profile.usd)
    const eur = AppUseSelector(state => state.profile.eur)
    const temp = AppUseSelector(state => state.profile.temp)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const onPortalHandler = () => {
        return navigate('/portal')
    }


    useEffect(() => {
        dispatch(getCurrencyUSD())
        dispatch(getCurrencyEUR())
        dispatch(getWeatherInMinsk())
    }, [])

    return (
        <>
            <div>Weather in Minsk: {temp} °C</div>
            <div>Currency USD: {usd}</div>
            <div>Currency EUR: {eur}</div>
            <button onClick={onPortalHandler}>Watch my applications</button>
        </>
    )
}