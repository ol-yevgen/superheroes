// import { ColorModeButton, Navigation, UserMenu } from '../../index'
import { Navigation } from '../index'
import { Box, IconButton, Avatar, Tooltip } from '@mui/material'
import { useState } from 'react';

export const MainNav = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorElUser);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}> */}
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                    <Navigation handleCloseNavMenu={handleClose} />
                    {/* <ColorModeButton /> */}
                </Box>
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
                            {/* {userName?.charAt(0).toUpperCase()} */}
                        </Avatar>
                    </IconButton>
                </Tooltip>


            </Box>
        </>

    );
}