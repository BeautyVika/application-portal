import React, {useState} from "react";

export const useShowPassword = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword(show => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return {showPassword, handleClickShowPassword, handleMouseDownPassword}
}