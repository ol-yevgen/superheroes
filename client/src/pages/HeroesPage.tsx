import { FC, memo, useMemo, useState } from "react"
import { Spinner, HeroCard, PaginationControlled } from "components/index"
import { Box, Card, Grid, Typography } from "@mui/material"
import { useGetHeroesQuery } from "redux/api/heroesApi"
import { IHeroShortTypes } from "types/HeroTypes"

export const HeroesPage: FC = memo(() => {

    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetHeroesQuery(page)

    const heroes = useMemo(() => data?.allHeroesShort as IHeroShortTypes[], [data])
    const totalPages = useMemo(() => data?.totalPages as number, [data])

    if (isLoading) return <Spinner />

    if (heroes.length === 0) {
        return (
            <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
                {data?.message}
            </Typography>
        )
    }

    return (
        <Box component='section' sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', flexGrow: '1' }}>

            <Grid sx={{ width: '100%', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '30px' }}>
                {heroes?.map(hero => {
                    return (
                        <Card
                            key={hero.id}
                            sx={{ maxWidth: 400, width: '100%', m: '0 auto', }}
                        >
                            <HeroCard heroData={hero} />

                        </Card>

                    )
                })}
            </Grid>
            <PaginationControlled
                currentPage={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </Box>
    )
})