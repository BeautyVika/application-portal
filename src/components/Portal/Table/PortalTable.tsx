import React from "react";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Actions} from "../Actions/Actions";
import Table from "@mui/material/Table";
import {AppUseSelector} from "../../../store/store";

const titleHeadTable = ['Topic', 'Description', 'Date of creation', 'Action']

export const PortalTable = () => {
    const applications = AppUseSelector(state => state.applications)

    return <Table sx={{ minWidth: '650px'}} aria-label="simple table">
        <TableHead>
            <TableRow sx={{backgroundColor: '#7a7a7a'}}>
                {titleHeadTable.map(t =>
                    <TableCell sx={{width: '28%', fontSize: '1.2rem'}}>{t}</TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
            {applications.map((app) => (
                <TableRow
                    key={app.id}>
                    <TableCell component="th" scope="row">
                        {app.topic}
                    </TableCell>
                    <TableCell align="left">{app.description}</TableCell>
                    <TableCell align="left">{new Date(app.date).toDateString()}</TableCell>
                    <TableCell align="left">
                        <Actions appId={app.id}
                                 appName={app.topic}
                                 appDescription={app.description}
                                 appDate={app.date}/>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}