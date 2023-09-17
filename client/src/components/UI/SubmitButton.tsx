import { Button } from "@mui/material"
import { FC } from "react"

interface SubmitButtonType {
    label: string,
    onHandleSubmit: any,
    isValid: boolean
}

export const SubmitButton: FC<SubmitButtonType> = ({ label, onHandleSubmit, isValid }) => {
    
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onHandleSubmit}
            disabled={!isValid}
            sx={{
                mt: 3,
                mb: 2,
                bgcolor: 'text.primary',
                '&:hover': {
                    bgcolor: 'background.hover'
                },
                '&:disabled': {
                    color: 'background.paper',
                    bgcolor: 'background.disabled'
                }
            }}
        >
            {label}
        </Button>
    )
}