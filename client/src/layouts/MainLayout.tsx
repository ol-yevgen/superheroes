import { Header, Footer, Spinner } from "../components/index"
import { Box, Container } from "@mui/material"
import { ProtectedRoutes } from "utils/routes"
import { FC, useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import { useRefreshLoginQuery, useLogoutUserMutation } from "redux/api/authApi";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";

export const MainLayout: FC = () => {
    const { isLoading, isError, isSuccess, error, data } = useRefreshLoginQuery()
    const [logoutUser] = useLogoutUserMutation()
    
    const navigate: NavigateFunction = useNavigate()
    const location: Location = useLocation()

    useEffect(() => {
        if (isSuccess) {
            const interval = setTimeout(() => {

                navigate(`${location.pathname}`, { replace: false })
            }, 0)

            return () => clearTimeout(interval)

        }
        if (isError) {
            logoutUser()
            navigate('/login')
        }
    }, [isSuccess, isError])

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
                {isLoading && !isSuccess ? <Spinner /> :  <ProtectedRoutes />}
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
