import { Container, Typography } from "@mui/material"

const Disclaimer = () => {

    return (
        <Container sx={{ p: '30px', textAlign: 'center'}}>
            <Typography
                component="h1"
                variant="h5"
                sx={{mb: '30px', fontSize: '30px', fontWeight: 'bold' }}
            >
                This project is designed to demonstrate my skills as a FullStack developer.
            </Typography>
            <Typography component="p" variant="h6" sx={{mb: '30px'}}>
                You can register and attend to the site as a regular user and, for demonstration purposes, you can also log in as an administrator by entering the following details:
            </Typography>
            <Typography
                component="h2"
                variant="h6"
                sx={{ display: 'block' }}
            >
                Email:
                <Typography
                    component="span"
                    variant="h6"
                    sx={{ ml: '20px', fontWeight: 'bold' }}
                >
                    admin@gmail.com
                </Typography>
            </Typography>
            <Typography
                component="h2"
                variant="h6"
                sx={{ display: 'block',  }}
            >
                Password:
                <Typography
                    component="span"
                    variant="h6"
                    sx={{ ml: '20px', fontWeight: 'bold' }}
                >
                    admin
                </Typography>
            </Typography>
        </Container>
    )
}

export default Disclaimer