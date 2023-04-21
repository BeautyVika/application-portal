import React, {FC} from "react";
import {BasicModal} from "./BasicModals";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {SubmitHandler,Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type AddPackModalPropsType = {
    onAddHandle: (data: NewApplicationType) => void
}
export type NewApplicationType = {
    topic: string
    description: string
    date: Date
}

export const AddModals: FC<AddPackModalPropsType> = ({onAddHandle}) => {

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const { register, handleSubmit, reset, control } = useForm<NewApplicationType>()

    const onSubmit: SubmitHandler<NewApplicationType> = (data) => {
        onAddHandle(data)
        handleClose()
    }

    return (
        <>
            <Button onClick={handleOpen}>Add new application</Button>

            <BasicModal open={open} handleClose={handleClose}>
                <Typography variant="h6" component="h2">
                    ADD NEW APPLICATION
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDateFns}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        sx={{ m: 1, width: '347px' }}
                        id="topic"
                        label="Enter topic"
                        variant="standard"
                        {...register('topic' )}
                    />
                    <TextField
                        margin="normal"
                        sx={{ m: 1, width: '347px' }}
                        id="description"
                        label="Enter description"
                        variant="standard"
                        {...register('description', {
                            maxLength: { value: 30, message: 'Maximum length of password is 30 symbols' }
                        })}
                    />
                    <Controller
                        control={control}
                        name="date"
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                            <DatePicker
                                {...field}
                                inputRef={ref}
                                label="Enter date"
                            />
                        )}
                    />

                    <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
                        <Button variant={'outlined'} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Save
                        </Button>
                    </Typography>
                </form>
                </LocalizationProvider>
            </BasicModal>
        </>
    )
}