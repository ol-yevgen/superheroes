import {CardContent, CardMedia, CardActionArea, Typography }  from '@mui/material';
import { Link } from 'react-router-dom';
import { IHeroShortTypes } from 'types/HeroTypes';

interface IHeroDataTypes {
    heroData: IHeroShortTypes
}

export const HeroCard = ({ heroData }: IHeroDataTypes) => {
    return (
        <CardActionArea>
            <Link to={`${heroData.id}`}>
                <CardMedia
                    component="img"
                    height="200"
                    image={heroData.image}
                    alt="green iguana"
                />
                <CardContent>
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
