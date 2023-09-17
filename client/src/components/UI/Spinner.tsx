import { Box, CircularProgress } from "@mui/material"

export const Spinner = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress sx={{ color: 'text.primary' }}/>
        </Box>
    )
}