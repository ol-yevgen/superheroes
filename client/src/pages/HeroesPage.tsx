import { FC, Fragment, useCallback, useContext, useEffect, useState } from "react"
import { Spinner, HeroCard } from "../components/index"
import { Box, Card, Grid } from "@mui/material"
import { useGetHeroesQuery } from "redux/api/heroesApi"
import { IHeroShortTypes } from "types/HeroTypes"

export const HeroesPage: FC = () => {

    const { data, isLoading } = useGetHeroesQuery(null)
    // const selector = useAppSelector()
    const heroes = data as IHeroShortTypes[]
    
    return (
        <>
            {isLoading
                ? <Spinner />
                : <Grid component='section' sx={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr'}, gap: '30px' }}>
                    {heroes.map(hero => {
                        return (
                            <Card
                                key={hero.id}
                                sx={{ maxWidth: 400, width: '100%', m: '0 auto',  }}
                            >
                                <HeroCard heroData={hero} />
                                
                            </Card>
                            
                        )
                    })}
                </Grid>
            }
        </>

    )
}