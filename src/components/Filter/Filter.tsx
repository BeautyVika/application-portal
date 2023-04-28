import React, {FC, useEffect} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useAppDispatch} from "../../store/store";
import {getAllApplications} from "../../store/applicationReducer";

const options = ['My applications', 'All applications']

export const Filter = () => {
    const [value, setValue] = React.useState<string | null>(options[0])
    const [inputValue, setInputValue] = React.useState('')

    return (
        <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
                setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            options={options}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Applications"/>}
        />

    )
}
