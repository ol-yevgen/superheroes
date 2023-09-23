import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const authNav = [
    {
        title: 'All heroes',
        route: '/heroes',
    },
    {
        title: 'New hero',
        route: '/add',
    },
];
const notAuthNav = [
    {
        title: 'Login',
        route: '/',
    },
    {
        title: 'Sign Up',
        route: '/registration',
    },
]

interface NavigationType {
    handleCloseNavMenu: () => void,
}

const Navigation = ({ handleCloseNavMenu }: NavigationType) => {

    return (
        <>
            {
                authNav.map((page) => (
                    <Link key={page.title} to={page.route}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ width: '125px', my: 1, px: 2, color: "text.primary", display: 'block' }}
                        >
                            {page.title}
                        </Button>
                    </Link>
                ))}
        </>
        
    );
}

export default Navigation