// import { Container, Typography, Paper } from '@mui/material';
// import { Input, SubmitButton } from "../components/index";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
import { FC, FormEvent } from "react"
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';

// const loginSchema = yup.object().shape({
//     title: yup
//         .string()
//         .min(2, 'Minimum 2 characters')
//         .required(),
//     text: yup
//         .string()
//         .required()
//         .min(2, 'Minimum 2 characters')
// })

export const AddNewHeroPage: FC = () => {

    return (
        <>
            Add New Hero Page
        </>
    )
    // const navigate = useNavigate()

    // const {
    //     register,
    //     getValues,
    //     formState: {
    //         errors,
    //         isValid,
    //     },
    //     // handleSubmit,
    //     reset
    // } = useForm(
    //     {
    //         defaultValues: {
    //             title: "",
    //             text: ""
    //         },
    //         mode: "onChange",
    //         resolver: yupResolver(loginSchema)
    //     }
    // )

    // const onHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()

    //     const formattedData = {
    //         title: getValues().title.toLowerCase(),
    //         text: getValues().text.toLowerCase()
    //     }
        

    // };

    // return (
    //     <Container maxWidth="xs">
    //         <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //             <Typography component="h1" variant="h5">
    //                 Create new task
    //             </Typography>
    //             <form
    //                 autoComplete='off'
    //                 style={{ width: '100%', marginTop: '1rem' }}
    //             >
    //                 <Input
    //                     label='title'
    //                     name='title'
    //                     error={errors?.title}
    //                     register={register}
    //                 />
    //                 <Input
    //                     label='text'
    //                     name='text'
    //                     error={errors?.text}
    //                     register={register}
    //                 />

    //                 <SubmitButton
    //                     label='Create'
    //                     onHandleSubmit={onHandleSubmit}
    //                     isValid={isValid}
    //                 />
    //             </form>
    //         </Paper>
    //     </Container>
    // );
}
