import React, {FC, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {BasicModal} from "../../components/Modals/BasicModals";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {deleteApplication} from "../../store/applicationReducer";
import {useAppDispatch} from "../../store/store";

type DeleteModalType = {
    appId: string
    appName: string
}
export const DeleteModals: FC<DeleteModalType> = ({appId, appName}) => {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const onDeleteAppHandler = (id: string) => {
        dispatch(deleteApplication(id))
        handleClose()
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <DeleteSweepIcon/>
            </IconButton>

            <BasicModal open={open} handleClose={handleClose}>
                <Typography variant="h5" component="h2">
                    DELETE APPLICATION
                </Typography>
                <Typography sx={{mt: 2}}>
                    Do you really want to remove <b>{appName}</b>?
                    <br/>
                    Your application will be deleted
                </Typography>
                <Typography sx={{mt: 2}} display={'flex'} justifyContent={'space-between'}>
                    <Button variant={'outlined'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={'contained'} color={'error'} onClick={() => onDeleteAppHandler(appId)}>
                        Delete
                    </Button>
                </Typography>
            </BasicModal>
        </>
    )
}