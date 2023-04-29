import React from "react";

import {useNavigate} from "react-router-dom";
import {AppUseSelector, useAppDispatch} from "../../store/store";
import s from "./Header.module.scss";
import Button from "@mui/material/Button";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import {logout} from "../../store/authReducer";
import AppsIcon from '@mui/icons-material/Apps';
import {AppBar, Toolbar} from "@mui/material";

export const Header = () => {
    const isLoggedIn = AppUseSelector(state => state.auth.isLoggedIn)
    const currentUser = AppUseSelector(state => state.auth.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const loginHandler = () => navigate('/login')

    const exitHandler = () => {
        dispatch(logout())
    }

    return (
        <div className={s.nav}>
            <AppBar position="static" color={'inherit'}>
                <Toolbar className={s.toolBar}>
                    <AppsIcon sx={{color: '#0BB7A5'}} fontSize={"large"}/>
                    {isLoggedIn
                        ? <div className={s.email}>
                            <span>{currentUser.email}</span>
                            <IconButton onClick={exitHandler}>
                                <ExitToAppIcon sx={{color: '#0BB7A5'}}/>
                            </IconButton>
                        </div>
                        : <Button variant={'outlined'}
                                  color={'success'}
                                  sx={{borderColor: '#0BB7A5', color: '#0BB7A5'}}
                                  onClick={loginHandler}
                        >
                            Sing In
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
