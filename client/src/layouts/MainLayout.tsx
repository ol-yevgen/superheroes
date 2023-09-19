import { Header, Footer, Spinner } from "../components/index"
import { Box, Container } from "@mui/material"
import { useRoutes } from "utils/routes"
import { FC, useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom"

export const MainLayout: FC = () => {

    const routes = useRoutes()

    const navigate: NavigateFunction = useNavigate()
    const location: Location = useLocation()

    // useEffect(() => {
    //     navigate(location.pathname)
    //     eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

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
                {/* {loading ? <Spinner /> : routes} */}
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
