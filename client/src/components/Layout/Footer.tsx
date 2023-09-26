import { Box, Container } from "@mui/material"
import { FC } from "react"

const Footer: FC = (props) => {
    return (
        <Box component="footer" sx={
            {
                width: '100%',
                bgcolor: 'background.paper',
                boxShadow: '0px -2px 6px 0px rgba(0,0,0,0.2), 0px 10px 10px 0px rgba(0,0,0,0.14), 9px 18px 10px 15px rgba(0,0,0,0.12)'
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

export default Footer