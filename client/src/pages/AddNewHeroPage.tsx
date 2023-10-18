import { Typography, Paper, Box } from '@mui/material';
import { Input, SubmitButton, FileUploader, Spinner,} from "components/index";
import {  useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useState } from "react"
import { heroCreateSchema } from 'schemas/heroSchema'
import { useCreateHeroMutation } from 'redux/api/heroesApi';
import { convertToBase64 } from 'utils/base64'
import { successToast, errorToast } from 'utils/toast';
import { IErrorMessage } from 'types/HeroTypes';
import { useAppSelector } from 'redux/store';

export const AddNewHeroPage = () => {
    const [createHero, { isError, isSuccess, isLoading, data: resData, error }] = useCreateHeroMutation()
    const accessToken = useAppSelector((state) => state.authState.accessToken) as string

    const [selectedPictures, setSelectedPictures] = useState<File[]>([]);
    const navigate = useNavigate()

    const {
        control,
        register,
        getValues,
        resetField,
        formState: {
            errors,
            isValid,
        },
        reset
    } = useForm(
        {
            defaultValues: {
                nickname: '',
                real_name: '',
                superpowers: '',
                catch_phase: '',
                origin_description: '',
                images: '' 
            },
            mode: "onChange",
            resolver: yupResolver(heroCreateSchema)
        }
        )
    
    useEffect(() => {
        if (isSuccess) {
            successToast(resData?.message as string)
            setSelectedPictures([])
            reset()
            navigate(`/heroes/${resData?.heroId}`)
        }
        if (isError) {
            const errorMessage = error as IErrorMessage

            errorToast(errorMessage?.data as string)
        }
    }, [isError, isSuccess, resData?.message, resData?.heroId, error, reset, navigate])

    useEffect(() => {
        if (selectedPictures.length === 0) {
            resetField('images')
        }
    }, [resetField, selectedPictures])

    const onHandleCreateSubmit = useCallback(async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        
        const base64 = await convertToBase64(selectedPictures) 
        const formData = JSON.parse(JSON.stringify(getValues()))
        formData.images = base64

        await createHero({formData, accessToken})

    }, [createHero, getValues, selectedPictures, accessToken]);

    return (
        <Paper elevation={3} sx={{ padding: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '30px'}}>
            <Typography component="h1" variant="h5">
                Create new hero
            </Typography>
            <Box
                component='form'
                autoComplete='off'
                maxWidth='md'
                sx={{ width: '100%', marginTop: '1rem', }}
            >
                <Box sx={{ display: { xs: 'block', sm: 'flex' }, gap: '30px', borderRadius: '10px' }}>
                    
                    <Input
                        label='Nickname'
                        name='nickname'
                        error={errors?.nickname}
                        register={register}
                        multiline={false}
                        maxRows={1}
                    />
                    <Input
                        label='Real name'
                        name='real_name'
                        error={errors?.real_name}
                        register={register}
                        multiline={false}
                        maxRows={1}
                    />
                </Box>
                <Input
                    label='Superpowers'
                    name='superpowers'
                    error={errors?.superpowers}
                    register={register}
                    multiline={true}
                    maxRows={3}
                />

                <Input
                    label='Catch phase'
                    name='catch_phase'
                    error={errors?.catch_phase}
                    register={register}
                    multiline={true}
                    maxRows={3}
                />

                <Input
                    label='Description'
                    name='origin_description'
                    error={errors?.origin_description}
                    register={register}
                    multiline={true}
                    maxRows={5}
                />

                <FileUploader
                    control={control}
                    selectedPictures={selectedPictures}
                    setSelectedPictures={setSelectedPictures}
                />

                {isLoading
                    ? <Spinner />
                    : <SubmitButton
                        label={'Create hero'}
                        onHandleSubmit={onHandleCreateSubmit}
                        isValid={isValid}
                    />
                }
            </Box>
        </Paper>
    );
}