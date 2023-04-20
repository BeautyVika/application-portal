import React, {FC} from "react"
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import {useShowPassword} from "../../../../hooks/useShowPassword";

type PasswordInputPropsType = {
    id: string
    register: any
    error: any
}

export const PasswordInput: FC<PasswordInputPropsType> = ({id, register, error}) => {

    const { showPassword, handleClickShowPassword, handleMouseDownPassword } = useShowPassword()

    return <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
            id={id}
            type={showPassword ? "text" : "password"}
            error={!!error}
            {...register(id, {
                required: 'Password is a required field!',
                minLength: { value: 6, message: 'Minimum length of password is 6 symbols' },
                maxLength: { value: 12, message: 'Maximum length of password is 12 symbols' },
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
        {error && <span>{error.message}</span>}
    </FormControl>
}