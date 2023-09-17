import { Menu, Avatar, MenuItem, ListItemIcon, Divider, Box } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { FC } from 'react';

const userMenuList = [
    {
        title: 'Profile',
        icon: <Avatar sx={{ bgcolor: 'text.primary', }} />
    },
    {
        title: 'Settings',
        icon: <Settings sx={{ color: 'text.primary', }} />
    },
    {
        title: 'Logout',
        icon: <Logout sx={{ color: 'text.primary', }} />
    }
]

interface UserMenuType {
    handleClose: () => void,
    anchorElUser: HTMLElement | null,
    logoutHandler: () => void
}

export const UserMenu: FC<UserMenuType> = ({ handleClose, anchorElUser, logoutHandler }) => {
    const open = Boolean(anchorElUser);

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
            {userMenuList.map((item, index) => {
                return (
                    <Box key={index}>
                        <Link to={`/${item.title.toLowerCase()}`}>
                            <MenuItem onClick={item.title === 'Logout' ? logoutHandler : handleClose} sx={{ color: 'text.primary', }} >
                                <ListItemIcon>
                                    {item.icon}

                                </ListItemIcon>
                                {item.title}
                            </MenuItem>
                        </Link>
                        {item.title === 'Profile' ? <Divider /> : null}
                    </Box>
                )
            })}
        </Menu>

    );
}