import { Spinner, TransitionsModal, PaginationSwiper, EditButton, DeleteButton } from 'components';
import { Typography, Box, CardMedia } from '@mui/material';
import { useGetHeroQuery } from 'redux/api/heroesApi';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import { FC, memo, useEffect, useState } from 'react';
import { errorToast } from 'utils/toast';
import { useLogoutUserMutation } from 'redux/api/authApi';

export const HeroDetailPage: FC = memo(() => {
    const { userInfo, accessToken } = useAppSelector((state) => state.authState)

    const ROLE = process.env.REACT_APP_ROLE as string
    const isAdmin = userInfo?.role === ROLE
    const heroId = useParams().id as string

    const { data, isLoading, isSuccess, isError, error } = useGetHeroQuery({ id: heroId, accessToken })

    const navigate: NavigateFunction = useNavigate()
    const [logoutUser] = useLogoutUserMutation()

    const modalStatus = useAppSelector((state) => state.modalState.isModal)
    const heroFullInfo = data?.hero

    const [link, setLink] = useState<string>('')

    useEffect(() => {
        if (!data?.accessToken && data?.accessToken !== undefined) {
            logoutUser()
            navigate('/login')
            errorToast('Pls, login again')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.accessToken])

    
    const handleOpenClose = (link: string) => {
        setLink(link)
    };

    return (
        isLoading
            ? <Spinner />
            : <Box component='section' sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: { xs: 'center', md: 'flex-start' }, flexDirection: { xs: 'column-reverse', md: 'row' }, mb: '30px' }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, height: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                    <CardMedia
                        component='img'
                        height='100%'
                        image={heroFullInfo?.images[0].image as string}
                        alt={heroFullInfo?.nickname}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, mb: '30px', px: '30px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
                        <Typography component="h1" variant='h6' >
                            <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                                Nickname:
                            </Box>
                            {heroFullInfo?.nickname}
                        </Typography>
                        {isAdmin
                            ? <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '20%' }}>
                                <EditButton />
                                <DeleteButton />
                            </Box>
                            : null
                        }
                    </Box>
                    <Typography component="h2" variant='h6' mb='10px'>
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Real name:
                        </Box>
                        {heroFullInfo?.real_name}
                    </Typography>
                    <Typography component="h3" mb='10px'>
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Phase:
                        </Box>
                        {heroFullInfo?.catch_phase}
                    </Typography>
                    <Typography component="h3" mb='10px'>
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Superpowers:
                        </Box>
                        {heroFullInfo?.superpowers}
                    </Typography>
                    <Typography component="p">
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Description:
                        </Box>
                        {heroFullInfo?.origin_description}
                    </Typography>
                </Box>
            </Box>

            <PaginationSwiper imagesList={heroFullInfo?.images} handleOpenClose={handleOpenClose} />

            <TransitionsModal
                open={modalStatus}
                image={link}
                data={heroFullInfo}
                handleOpenClose={handleOpenClose}
            />
        </Box>
    )
})
