import { Box, Container } from "@mui/material"
import { FC } from "react"

export const Footer: FC = (props) => {
    return (
        <Box component="footer" sx={
            {
                width: '100%',
                bgcolor: 'background.paper',
            }}>
            <Container maxWidth='xl' sx={
                {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'text.primary',
                    p: '20px'
                }}>
                Created by Oliinyk Yevgenii
            </Container>
        </Box>
    )
}