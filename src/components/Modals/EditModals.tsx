import React, {FC, useState} from "react";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {NewApplicationType} from "../Modals/AddModals";
import {BasicModal} from "../Modals/BasicModals";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {updateApplication} from "../../store/applicationReducer";
import {useAppDispatch} from "../../store/store";
import {ModalsButton} from "../common/components/ModalsButton/ModalsButton";

type EditModalsPropsType = {
    appId: string
    appName: string
    appDescription: string
    appDate: Date
}

export const EditModals: FC<EditModalsPropsType> = ({
                                                        appId,
                                                        appName,
                                                        appDescription,
                                                        appDate
                                                    }) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
    }
    const dispatch = useAppDispatch()

    const {register, handleSubmit, control} = useForm<NewApplicationType>()

    const onSubmit: SubmitHandler<NewApplicationType> = (data) => {
        dispatch(updateApplication(appId, data))
        handleClose()
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <BorderColorIcon style={{marginRight: '8px'}}/>
            </IconButton>
            <BasicModal open={open} handleClose={handleClose}>
                <Typography variant="h5" component="h2">
                    EDIT APPLICATION
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            sx={{m: 1, width: '347px'}}
                            id="topic"
                            label="Enter topic"
                            variant="standard"
                            defaultValue={appName}
                            {...register('topic', {
                                maxLength: {value: 12, message: 'Maximum length of password is 12 symbols'}
                            })}
                        />
                        <TextField
                            margin="normal"
                            sx={{m: 1, width: '347px'}}
                            id="description"
                            label="Enter description"
                            variant="standard"
                            defaultValue={appDescription}
                            {...register('description', {
                                maxLength: {value: 30, message: 'Maximum length of password is 30 symbols'}
                            })}
                        />
                        <Controller
                            control={control}
                            name="date"
                            render={({field: {ref, onBlur, name, ...field}}) => (
                                <DatePicker
                                    {...field}
                                    inputRef={ref}
                                    sx={{m: 1, width: '347px'}}
                                    label="Enter date"
                                    defaultValue={new Date(appDate)}
                                />
                            )}
                        />
                        <Typography sx={{mt: 2}} display={'flex'} justifyContent={'space-between'}>
                            <ModalsButton handleClose={handleClose}/>
                        </Typography>
                    </form>
                </LocalizationProvider>
            </BasicModal>
        </>
    )
}