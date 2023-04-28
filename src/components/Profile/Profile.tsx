import React, {useEffect} from "react";
import {AppUseSelector, useAppDispatch} from "../../store/store";
import {getCurrencyEUR, getCurrencyUSD, getWeatherInMinsk} from "../../store/profileReducer";
import s from "./Profile.module.scss"
import Paper from "@mui/material/Paper";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EuroIcon from '@mui/icons-material/Euro';

export const Profile = () => {

    const usd = AppUseSelector(state => state.profile.usd)
    const eur = AppUseSelector(state => state.profile.eur)
    const temp = AppUseSelector(state => state.profile.temp)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getCurrencyUSD())
        dispatch(getCurrencyEUR())
        dispatch(getWeatherInMinsk())
    }, [])

    return (

        <Paper elevation={3} sx={
            {
                width: '300px',
                padding: '15px 0',
                textAlign: 'center',
                fontSize: '1.2rem'
            }}>
                <div className={s.container}><ThermostatIcon sx={{color: '#0BB7A5'}}/> Weather in Minsk: {Math.round(temp)} °C</div>
                <div className={s.container}><AttachMoneyIcon sx={{color: '#0BB7A5'}}/>  {usd}</div>
                <div className={s.container}><EuroIcon sx={{color: '#0BB7A5'}}/> {eur}</div>
            </Paper>

    )
}