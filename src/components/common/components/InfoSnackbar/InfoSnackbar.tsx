import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {AppUseSelector, useAppDispatch} from "../../../../store/store"
import {setAuthInfo} from "../../../../store/authReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export const InfoSnackBar = () => {

    const info = AppUseSelector(state => state.auth.info)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
       dispatch(setAuthInfo(null))
    }
    const isOpen = info !== null;

    return (
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{backgroundColor: '#0BB7A5'}}>
                    {info}
                </Alert>
            </Snackbar>
    )
}

