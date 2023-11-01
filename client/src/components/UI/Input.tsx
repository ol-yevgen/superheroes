import { FieldError } from "react-hook-form"
import { TextField } from "@mui/material"
import { FC, memo, useMemo } from "react"

interface InputTypes {
    label: string,
    name: string,
    register: any,
    error?: FieldError | undefined,
    multiline: boolean,
    defaultValue?: string
}

const Input: FC<InputTypes> = memo(({ label, name, register, error, multiline, defaultValue }) => {    

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
            multiline={multiline}
            error={!!error}
            autoComplete={`new-${name}`}
            defaultValue={defaultValue}
            minRows={1}
            maxRows={50}
            helperText={
                !!error
                    ? error.message
                    : ''
            }
        />
    )
})

export default Input