import { Navigation } from '../index'
import { Box, IconButton, Avatar, Tooltip } from '@mui/material'
import { useState } from 'react';
import { UserMenu } from './UserMenu';

import { TUserInfo } from 'types/AuthTypes'
import { useAppSelector } from 'redux/store';

const MainNav = () => {
    const userInfo = JSON.parse(localStorage.getItem('USER') as string) as TUserInfo
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { accessToken } = useAppSelector((state) => state.authState)
    const open = Boolean(anchorElUser);



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        if (anchorElUser !== null) {
            setAnchorElUser(null);
        }
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };



    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                    <Navigation handleCloseNavMenu={handleClose} />
                </Box>
                {accessToken &&
                    <>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'text.primary', }}>
                                    {userInfo && userInfo.userName.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <UserMenu
                            handleClose={handleClose}
                            anchorElUser={anchorElUser}
                            // logoutHandler={logoutHandler}
                            userName={userInfo ? userInfo.userName : null}
                            open={open}
                        />
                    </>
                }

            </Box>

        </>

    );
}

export default MainNav