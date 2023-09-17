import { FieldError } from "react-hook-form"
import { TextField } from "@mui/material"
import { FC } from "react"

interface InputTypes {
    label: string,
    name: string,
    error: FieldError | undefined ,
    register: any,
}

export const Input: FC<InputTypes> = ({ label, name, register, error }) => {
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