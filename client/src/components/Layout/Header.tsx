import { AppBar, Box, Toolbar, Container } from '@mui/material'
import { Logo, MainNav, MobileNav } from '../index'

const Header = () => {

    return (
        <AppBar position="static" sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <MobileNav />
                        <Logo />
                    </Box>

                    <MainNav />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header