import { Container, Typography, Paper } from '@mui/material';
import { Input, SubmitButton, Spinner, Disclaimer, TransitionsModal } from "../components/index";
import {useRegistrationUserMutation, useLoginUserMutation,} from 'redux/api/authApi'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountCircle } from '@mui/icons-material';
import { FC, FormEvent, memo, useCallback, useEffect, useState } from "react"
import { loginSchema, registrationSchema } from 'schemas/authSchema'
import { successToast, errorToast } from 'utils/toast'

export const AuthorizationPage: FC = memo(() => {
    const [isRegistration, setIsRegistration] = useState<boolean>(false)
    const [disclaimerStatus, setDisclaimerStatus] = useState(true)

    const [loginUser, {
        isError: loginIsError,
        isSuccess: loginSuccess,
        isLoading: loginLoading,
        data: loginData,
        error: loginError
    }] = useLoginUserMutation()

    const [registrationUser, {
        isError: registrationIsError,
        isSuccess: registrationSuccess,
        isLoading: registrationLoading,
        data: registrationData,
        error: registrationError
    }] = useRegistrationUserMutation()

    const {
        register,
        getValues,
        formState: {
            errors,
            isValid,
        },
        reset
    } = useForm(
        {
            mode: "onChange",
            resolver: yupResolver(isRegistration ? registrationSchema : loginSchema)
        }
    )

    useEffect(() => {
        if (loginIsError) {
            errorToast('Check all fields or user is not found')
        }
        if (loginSuccess) {
            successToast(loginData?.message as string)
        }
    }, [loginIsError, loginSuccess])

    useEffect(() => {
        setIsRegistration(false)
    }, [registrationSuccess])

    const onLoginHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await loginUser(getValues())
        } catch (error) { }
    };

    const onRegistrationHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await registrationUser(getValues())
        } catch (error) { }
    };

    const closeDisclaimer = useCallback(() => {
        setDisclaimerStatus(false)
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AccountCircle sx={{ fontSize: '64px', mb: 2 }} />
                <Typography component="h1" variant="h5">
                    {isRegistration ? 'Registration' : 'Sign in'}
                </Typography>
                <form
                    autoComplete='off'
                    style={{ width: '100%', marginTop: '1rem' }}
                >
                    {isRegistration
                        ? <>
                            <Input
                                label='first name'
                                name='firstName'
                                error={errors?.firstName}
                                register={register}
                                multiline={false}
                            />
                            <Input
                                label='Last name'
                                name='lastName'
                                error={errors?.lastName}
                                register={register}
                                multiline={false}
                            />
                        </>
                        : null}
                    <Input
                        label='email'
                        name='email'
                        error={errors?.email}
                        register={register}
                        multiline={false}
                    />
                    <Input
                        label='password'
                        name='password'
                        error={errors?.password}
                        register={register}
                        multiline={false}
                    />

                    {loginLoading || registrationLoading
                        ? <Spinner />
                        : <SubmitButton
                            label={isRegistration ? 'Registration' : 'Sign in'}
                            onHandleSubmit={isRegistration ? onRegistrationHandleSubmit : onLoginHandleSubmit}
                            isValid={isValid}
                        />
                    }
                    <Typography
                        component="h2"
                        sx={{
                            textAlign: 'right',
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'blue',
                            }
                        }}
                        onClick={() => setIsRegistration(!isRegistration)}
                    >
                        {isRegistration ? 'Do You have an account, Sign in' : 'You don\'t have an account, Sign up'}
                    </Typography>
                    
                </form>
            </Paper>
            <TransitionsModal
                open={disclaimerStatus}
                image='disclaimer'
                content={<Disclaimer />}
                disclaimerClose={closeDisclaimer}
            />
        </Container>
    );
})
