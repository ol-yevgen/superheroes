import { Menu, Avatar, MenuItem, ListItemIcon, Divider, Box } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { FC } from 'react';

import { useLogoutUserMutation } from 'redux/api/authApi';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// import { TUserInfo } from 'types/AuthTypes'

// const userMenuList = [
//     {
//         title: 'Profile',
//         icon: <Avatar sx={{ bgcolor: 'text.primary', }} />
//     },
//     {
//         title: 'Settings',
//         icon: <Settings sx={{ color: 'text.primary', }} />
//     },
//     {
//         title: 'Logout',
//         icon: <Logout sx={{ color: 'text.primary', }} />
//     }
// ]

interface UserMenuType {
    handleClose: () => void,
    anchorElUser: HTMLElement | null,
    // logoutHandler: () => void,
    userName: string | null,
    open: boolean,
}

export const UserMenu: FC<UserMenuType> = ({ handleClose, anchorElUser, userName, open }) => {

    const [logoutUser] = useLogoutUserMutation()
    const navigate: NavigateFunction = useNavigate()

    const logoutHandler = async () => {
        await logoutUser()
        navigate('/heroes')
    }

    return (
        <Menu
            anchorEl={anchorElUser}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    bgcolor: 'background.paper',
                    color: "text.primary",
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Box>
                
                <Link to='/profile'>
                    <MenuItem onClick={handleClose} sx={{ color: 'text.primary', }} >
                        <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'text.primary', }}>
                                {userName && userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                </Link>
                <Divider />
                <Link to='/profile'>
                    <MenuItem onClick={handleClose} sx={{ color: 'text.primary', }} >
                        <ListItemIcon>
                            <Settings sx={{ color: 'text.primary', }} />
                        </ListItemIcon>
                        Setting
                    </MenuItem>
                </Link>
                <Link to='/'>
                    <MenuItem onClick={logoutHandler} sx={{ color: 'text.primary', }} >
                        <ListItemIcon>
                            <Logout sx={{ color: 'text.primary', }} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Link>
            </Box>
        </Menu>

    );
}