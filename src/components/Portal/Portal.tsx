import React, {useEffect} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AppUseSelector, useAppDispatch} from "../../store/store";
import {addNewApplication, getApplications} from "../../store/applicationReducer";
import {v1} from "uuid";
import {Actions} from "./Actions";
import {AddModals, NewApplicationType} from "../Modals/AddModals";

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
        <div style={{margin: '50px 50px 0'}}>
            <div>My applications</div>

            {/*<Button variant="contained" onClick={addApplicationHandler}>Add new application</Button>*/}

            <AddModals onAddHandle={addApplicationHandler}/>

            <TableContainer component={Paper}>
                {applications.length > 0 ?
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Topic</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Date of creation</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((app) => (
                            <TableRow
                                key={app.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {app.topic}
                                </TableCell>
                                <TableCell align="right">{app.description}</TableCell>
                                <TableCell align="right">{new Date(app.date).toDateString()}</TableCell>
                                <TableCell align="right">
                                    <Actions appId={app.id}
                                             appName={app.topic}
                                             appDescription={app.description}
                                             appDate={app.date}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                : <div>You don't have applications</div>}
            </TableContainer>
        </div>

    )
}
