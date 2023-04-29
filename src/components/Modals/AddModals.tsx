import React, {FC} from "react";
import {BasicModal} from "./BasicModals";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {SubmitHandler,Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {ModalsButton} from "../common/components/ModalsButton/ModalsButton";

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

    const [value, setValue] = React.useState<Date | null>(null);

    const onSubmit: SubmitHandler<NewApplicationType> = (data) => {
        onAddHandle(data)
        handleClose()
    }

    return (
        <>
            <Button sx={{color: '#0BB7A5', cursor: 'pointer'}} onClick={handleOpen}>Add new application</Button>

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
                        color={'success'}
                        {...register('topic', {
                            required: 'This field is a required field!',
                            maxLength: { value: 12, message: 'Maximum length of password is 12 symbols' }
                        } )}
                    />
                    <TextField
                        margin="normal"
                        sx={{ m: 1, width: '347px' }}
                        id="description"
                        label="Enter description"
                        variant="standard"
                        color={'success'}
                        {...register('description', {
                            required: 'This field is a required field!',
                            maxLength: { value: 30, message: 'Maximum length of password is 30 symbols' }
                        })}
                    />
                    <Controller
                        control={control}
                        name="date"
                        rules={{required: 'Date is reguared'}}
                        render={({ field: {name, ...field }, fieldState }) => (
                            <DatePicker
                                sx={{m: 1, width: '347px'}}
                                {...field}
                                label="Enter date"
                                value={value}
                            />
                        )}
                    />

                    <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
                        <ModalsButton handleClose={handleClose}/>
                    </Typography>
                </form>
                </LocalizationProvider>
            </BasicModal>
        </>
    )
}