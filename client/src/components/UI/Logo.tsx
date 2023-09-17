import { Typography } from "@mui/material"

import { FC } from "react"
import { Link } from "react-router-dom"

export const Logo: FC = () => {

    return (
        <Link to='/heroes'>
            <Typography
                variant='h6'
                noWrap
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    alignItems: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'text.primary',
                    textDecoration: 'none',
                }}
            >
                Superheroes
            </Typography>
        </Link>
    )
}