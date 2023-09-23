import { FieldError } from "react-hook-form"
import { TextField } from "@mui/material"
import { FC } from "react"

interface InputTypes {
    label: string,
    name: string,
    error: FieldError | undefined ,
    register: any,
    multiline: boolean
    maxRows: number,
}

const Input: FC<InputTypes> = ({ label, name, register, error, multiline, maxRows,  }) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            {...register(`${name}`)}
            required
            fullWidth
            type={name}
            id={name}
            label={label.slice(0, 1).toUpperCase() + label.slice(1)}
            name={name}
            maxRows={maxRows}
            multiline={multiline}
            error={!!error}
            autoComplete={`new-${name}`}
            helperText={
                !!error 
                    ? error.message
                    : ''
            }
        />
    )
}

export default Input