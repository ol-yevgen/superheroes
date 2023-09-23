import {CardContent, CardMedia, CardActionArea, Typography, Box }  from '@mui/material';
import { Link } from 'react-router-dom';
import { IHeroShortTypes } from 'types/HeroTypes';

interface IHeroDataTypes {
    heroData: IHeroShortTypes
}

const HeroCard = ({ heroData }: IHeroDataTypes) => {
    return (
        <CardActionArea>
            <Link to={`${heroData.id}`}>
                <Box sx={{ overflow: 'hidden'}}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={heroData.image}
                        alt="green iguana"
                        sx={{
                            maxHeight: '200px', transition: '.8s',
                            '&:hover': {
                                scale: '1.1',
                            }
                        }}
                    />
                </Box>
                <CardContent >
                    <Typography
                        gutterBottom
                        fontSize="22px"
                        variant="h5"
                        component="span"
                        color="black"
                        width="100%"
                        m={0}
                    >
                        {heroData.nickname.toUpperCase()}
                    </Typography>
                </CardContent>

            </Link>
        </CardActionArea>
    );
}

export default HeroCard