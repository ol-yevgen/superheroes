import { Spinner, TransitionsModal, PaginationSwiper, EditButton, DeleteButton } from 'components';
import { Typography, Box, CardMedia } from '@mui/material';
import { useGetHeroQuery } from 'redux/api/heroesApi';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import { FC, useState} from 'react';

export const HeroDetailPage: FC = () => {
    const heroId = useParams().id as string
    const { data, isLoading } = useGetHeroQuery(heroId)
    const modalStatus = useAppSelector((state) => state.modalState.isModal)

    const [link, setLink] = useState<string>('')

    const handleOpenClose = (link: string) => {
        setLink(link)
    };

    if (isLoading) return <Spinner />

    return (
        <Box component='section' sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: { xs: 'center', md: 'flex-start' }, flexDirection: { xs: 'column-reverse', md: 'row' }, mb: '30px' }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, height: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                    <CardMedia
                        component='img'
                        height='100%'
                        image={data?.images[0].link}
                        alt={data?.nickname}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, mb: '30px', px: '30px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
                        <Typography component="h1" variant='h6' >
                            <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                                Nickname:
                            </Box>
                            {data?.nickname}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '20%' }}>
                            <EditButton />
                            <DeleteButton />
                        </Box>
                    </Box>
                    <Typography component="h2" variant='h6' mb='10px'>
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Real name:
                        </Box>
                        {data?.real_name}
                    </Typography>
                    <Typography component="h3" mb='10px'>
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Phase:
                        </Box>
                        {data?.catch_phase}
                    </Typography>
                    <Typography component="h3" mb='10px'>
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Superpowers:
                        </Box>
                        {data?.superpowers}
                    </Typography>
                    <Typography component="p">
                        <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                            Description:
                        </Box>
                        {data?.origin_description}
                    </Typography>
                </Box>
            </Box>

            <PaginationSwiper imagesList={data?.images} handleOpenClose={handleOpenClose} />
            
            <TransitionsModal
                open={modalStatus}
                image={link}
                data={data}
                handleOpenClose={handleOpenClose} />
        </Box>
    )
}
