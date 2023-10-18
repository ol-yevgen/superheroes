import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useAppSelector } from 'redux/store';

const authNav = [
    {
        title: 'All heroes',
        route: '/heroes',
    },
    {
        title: 'Favorites',
        route: '/favorites',
    },
    {
        title: 'New hero',
        route: '/add',
    },
];
const notAuthNav = [
    {
        title: 'All heroes',
        route: '/heroes',
    },
    {
        title: 'sign in',
        route: '/',
    },
]

interface NavigationType {
    handleCloseNavMenu: () => void,
}

const Navigation = ({ handleCloseNavMenu }: NavigationType) => {
    const ROLE = process.env.REACT_APP_ROLE as string
    const { userInfo, accessToken} = useAppSelector((state) => state.authState)
    const isAdmin = userInfo?.role === ROLE
    const navigationLinks = accessToken ? isAdmin ? authNav : authNav.slice(0, 2) : notAuthNav
    
    return (
        <>
            {
                navigationLinks.map((page) => (
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