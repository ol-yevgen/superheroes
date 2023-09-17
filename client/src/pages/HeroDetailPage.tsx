import { Typography, Box, CardMedia } from '@mui/material';
import { Spinner, PaginationSwiper, TransitionsModal } from 'components';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetHeroQuery } from 'redux/api/heroesApi';

export const HeroDetailPage: FC = () => {
    const heroId = useParams().id as string
    const { data, isLoading } = useGetHeroQuery(heroId)
    
    const [open, setOpen] = useState<boolean>(false);
    const [link, setLink] = useState<string>('')

    const handleOpen = (link: string) => {
        setLink(link)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
        setLink('')
    };
    return (
        <>
            {isLoading
                ? <Spinner />
                : <>
                    <Box component='section' sx={{ width: '100%', height: '100%' }}>
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: { xs: 'center', md: 'flex-start' }, flexDirection: { xs: 'column-reverse', md: 'row' }, mb: '30px' }}>
                            <Box sx={{ width: { xs: '100%', md: '50%' }, height: '100%', borderRadius: '4px', overflow: 'hidden'}}>
                                <CardMedia
                                    component='img'
                                    height='100%'
                                    image={data?.images[0].link}
                                    alt={data?.nickname}
                                />
                            </Box>
                            <Box sx={{ width: { xs: '100%', md: '50%' }, mb: '30px', px: '30px'}}>
                                <Typography component="h1" variant='h6' mb='10px'>
                                    <Box component='span' fontWeight='bold' mr='10px' fontFamily='monospace'>
                                        Nickname:
                                    </Box>
                                    {data?.nickname}
                                </Typography>
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
                        <PaginationSwiper imagesList={data?.images} handleOpen={handleOpen}/>
                        <TransitionsModal
                            open={open}
                            image={link}
                            handleClose={handleClose}
                        />
                    </Box>
                </>
            }
        </>
    )
}





