import { Typography, Paper, Box, Button } from '@mui/material';
import { Input, SubmitButton, FileUploader } from "components/index";
import {  useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useState } from "react"
import { heroCreateSchema } from 'schemas/heroSchema'
import { useCreateHeroMutation } from 'redux/api/heroesApi';

export const AddNewHeroPage = () => {
    const [createHero, { isError, isSuccess, isLoading }] = useCreateHeroMutation()

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
        if (selectedPictures.length === 0) {
            resetField('images')
        }
    }, [resetField, selectedPictures])

    const onHandleCreateSubmit = useCallback(async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { nickname, real_name, superpowers, catch_phase, origin_description } = getValues()

        const formData = new FormData();
        formData.set('nickname', nickname as string)
        formData.set('real_name', real_name as string)
        formData.set('superpowers', superpowers as string)
        formData.set('catch_phase', catch_phase as string)
        formData.set('origin_description', origin_description as string)

        for (const file of selectedPictures) {
            formData.append('images', file);
        }

        await createHero(formData)

        setSelectedPictures([])
        reset()
        navigate(`/heroes`)
    }, [createHero, getValues, reset, selectedPictures, navigate]);

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

                {/* <Button onClick={() => console.log(getValues(), selectedPictures)}>Get data</Button> */}

                <SubmitButton
                    label={'Create hero'}
                    onHandleSubmit={onHandleCreateSubmit}
                    isValid={isValid}
                />
            </Box>
        </Paper>
    );
}