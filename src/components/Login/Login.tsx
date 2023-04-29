import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";

import Button from '@mui/material/Button';
import {Navigate, NavLink} from "react-router-dom";
import {PasswordInput} from "../common/components/PasswordInput/PasswordInput";
import {AppUseSelector, useAppDispatch} from "../../store/store";
import {login} from "../../store/authReducer";
import {regEmail} from "../common/constants/regEmail";
import s from "./Login.module.scss";
import Paper from "@mui/material/Paper";

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

    if (isLoggedIn) {
        return <Navigate to={'/portal'}/>
    }

    return (
        <div className={s.containerLogin}>
            <Paper elevation={3} sx={{height: '370px'}}>
                <div className={s.title}>
                    Sign in
                </div>

                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        sx={{m: 1, width: '347px'}}
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

                    <div style={{display: 'flex', justifyContent: "center", marginTop: "20px"}}>
                        <Button variant={'outlined'}
                                color={'success'}
                                type={'submit'}
                                sx={{borderColor: '#0BB7A5', color: '#0BB7A5'}}
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
                <div className={s.info}>
                    <span style={{marginBottom: "10px"}}>Don't have an account yet?</span>
                    <NavLink to={'/registration'} className={s.link}>
                        Create one
                    </NavLink>
                </div>
            </Paper>
        </div>
    )
}

