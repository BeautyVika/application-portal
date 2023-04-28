import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";

import Button from '@mui/material/Button';
import {Navigate, NavLink} from "react-router-dom";
import {PasswordInput} from "../common/components/PasswordInput/PasswordInput"
import s from "./Login.module.css"
import {AppUseSelector, useAppDispatch} from "../../store/store";
import {login} from "../../store/authReducer";

export const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

export type LoginType = {
    email: string
    password: string
}

export const Login = () => {

    const isLoggedIn = AppUseSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginType>()

    const onSubmit: SubmitHandler<LoginType> = (data: LoginType) => {
        dispatch(login(data))
    }

    if (isLoggedIn){
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.containerLogin}>
            <div className={s.title}>
                Sign in
            </div>

            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    margin="normal"
                    sx={{ m: 1, width: '347px' }}
                    id="email"
                    label="Email Address"
                    variant="standard"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: 'Email is a required field!',
                        pattern: {value: regEmail, message: 'Email is not valid',}
                    })}
                />
                <PasswordInput id={"password"} register={register} error={errors.password}/>

                <div style={{ display: 'flex', justifyContent: "center", marginTop: "20px"}}>
                    <Button variant={'outlined'} type={'submit'}>Sign in</Button>
                </div>
            </form>
            <div className={s.info}>
                <span style={{marginBottom: "10px"}}>Don't have an account yet?</span>
                <NavLink to={'/registration'} >
                    Create one
                </NavLink>
            </div>
        </div>
    )
}

