import React, {useEffect} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AppUseSelector, useAppDispatch} from "../../store/store";
import Button from "@mui/material/Button";
import {addNewApplication, getApplications} from "../../store/applicationReducer";
import {v1} from "uuid";

export const Portal = () => {

    const applications = AppUseSelector(state => state.applications)
    const userEmail =  AppUseSelector(state => state.auth.user.email)
    console.log(userEmail)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getApplications())
    }, [])

    const addApplicationHandler = () => {
        dispatch(addNewApplication(
            {id: v1(), email: userEmail, topic: 'Hello', description: 'Hello everybody', date: '20.04.23' }))
    }

    return (
        <div style={{margin: '50px 50px 0'}}>
            <div>My applications</div>

            <Button variant="contained" onClick={addApplicationHandler}>Add new application</Button>

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
                                <TableCell align="right">{app.date}</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                : <div>You don't have applications</div>}
            </TableContainer>
        </div>

    )
}
