import React, {useEffect} from "react"
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {AppUseSelector, useAppDispatch} from "../../store/store";
import {addNewApplication, getApplications} from "../../store/applicationReducer";
import {v1} from "uuid";
import {AddModals, NewApplicationType} from "../Modals/AddModals"
import {Filter} from "../Filter/Filter";
import {Profile} from "../Profile/Profile";
import {PortalTable} from "../Portal/Table/PortalTable";
import s from "./Portal.module.scss"

export const Portal = () => {

    const applications = AppUseSelector(state => state.applications)
    const userEmail =  AppUseSelector(state => state.auth.user.email)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getApplications())
    }, [])

    const addApplicationHandler = (data: NewApplicationType) => {
        dispatch(addNewApplication(
            {id: v1(), email: userEmail, topic: data.topic, description: data.description, date: data.date }))
    }

    return (
        <div className={s.portalContainer}>

            <div className={s.header}>
                <div className={s.title}>My applications</div>

                <Profile />
            </div>

            {/*<Filter/>*/}

            <AddModals onAddHandle={addApplicationHandler}/>

            <TableContainer component={Paper}>
                {applications.length > 0 ? <PortalTable /> : <div>You don't have applications</div>}
            </TableContainer>
        </div>

    )
}
