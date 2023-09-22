import { Header, Footer } from "../components/index"
import { Box, Container } from "@mui/material"
import { useRoutes } from "utils/routes"
import { FC } from "react"
import { ToastContainer } from 'react-toastify';

export const MainLayout: FC = () => {

    const routes = useRoutes()

    return (
        <Box minHeight='100vh' sx={{ width: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', overflow: 'hidden' }}>
            <Header />

            <Container maxWidth='xl' component="main" sx={
                {
                    width: '100%',
                    px: '30px',
                    pt: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: '1',
                    color: 'text.primary',
                }
            }>
                {routes}
            </Container>

            <Footer />
            
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Box>


    )
}
