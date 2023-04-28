import React from "react"
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Actions} from "../Actions/Actions";
import Table from "@mui/material/Table";
import {AppUseSelector} from "../../../store/store";

export const PortalTable = () => {
    const applications = AppUseSelector(state => state.applications)

    return <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
}