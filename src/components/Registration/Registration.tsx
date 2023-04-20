import React from "react"
import s from "../Login/Login.module.css"
import {PasswordInput} from "../common/components/PasswordInput/PasswordInput";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import {Navigate, NavLink} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {regEmail} from "../Login/Login";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import {AppUseSelector, useAppDispatch} from "../../store/store";
import {setIsRegister} from "../../store/authReducer";
import {v1} from "uuid";
import {useShowPassword} from "../../hooks/useShowPassword";
import {users} from "../common/constants/localStorageConstants"


export type RegistrationType = {
    email: string
    password: string
    confirmPassword: string
}

export const Registration = () => {

    const isRegister = AppUseSelector(state => state.auth.isRegister)
    const dispatch = useAppDispatch()

    const {showPassword, handleClickShowPassword, handleMouseDownPassword} = useShowPassword()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<RegistrationType>()


    const onSubmit: SubmitHandler<RegistrationType> = (data) => {
        if (users.some(elem => elem.email.toLowerCase() === data.email.toLowerCase())) {
            return  alert('This Email already exists')
        } else {
            const newUser = {id: v1(), email: data.email, password: data.password}
            localStorage.setItem('users', JSON.stringify([...users, newUser]))
            dispatch(setIsRegister(true))
        }
    }

    if (isRegister){
        return <Navigate to={'/login'}/>
    }

    return <div className={s.containerLogin}>
        <div className={s.title}>
            Sign up
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
            <PasswordInput id={"password"} register={register} error={errors.password} />

            <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id={"confirmPassword"}
                    type={showPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
                    {...register("confirmPassword", {
                        required: 'Password is a required field!',
                        minLength: { value: 6, message: 'Minimum length of password is 6 symbols' },
                        maxLength: { value: 12, message: 'Maximum length of password is 12 symbols' },
                        validate: (value,
                                   formValues) => value === formValues.password || 'Passwords are not the same'
                    })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </FormControl>


            <div style={{ display: 'flex', justifyContent: "center", marginTop: "20px"}}>
                <Button variant={'outlined'} type={'submit'}>Sign up</Button>
            </div>

            <div className={s.info}>
                <span style={{marginBottom: "10px"}}>Already have an account?</span>
                <NavLink to={'/login'} >
                    Sign in
                </NavLink>
            </div>
        </form>
    </div>
}