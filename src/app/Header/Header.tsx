import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {useNavigate} from 'react-router-dom'
import {AppUseSelector, useAppDispatch} from "../../store/store";
import s from "./Header.module.scss";
import Button from "@mui/material/Button";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import {logout} from "../../store/authReducer";

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
                    {isLoggedIn
                        ? <div className={s.email}>
                            <span>{currentUser.email}</span>
                            <IconButton onClick={exitHandler}>
                                <ExitToAppIcon/>
                            </IconButton>
                          </div>
                        : <Button onClick={loginHandler}>Sing In</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
