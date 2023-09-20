import { Typography, Paper, Box } from '@mui/material';
import { Input, SubmitButton, FileUploader } from "components/index";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useCallback, useState } from "react"
import { ICreateUpdateFormPropsTypes, IImageListResponseTypes } from 'types/HeroTypes';
import { heroSchema } from 'schemas/heroSchema'
import { useCreateHeroMutation } from 'redux/api/heroesApi';

export const CreateUpdateForm = ({ heroData }: ICreateUpdateFormPropsTypes ) => {
    // export const CreateUpdateForm = () => {
    const [createHero, { isError, isSuccess, data }] = useCreateHeroMutation()

    const [selectedPictures, setSelectedPictures] = useState<File[]>([]);
    const navigate = useNavigate()

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
            defaultValues: {
                nickname: heroData?.nickname,
                real_name: heroData?.real_name,
                superpowers: heroData?.superpowers,
                catch_phase: heroData?.catch_phase,
                origin_description: heroData?.origin_description,
                images: heroData?.images as IImageListResponseTypes[]
            },
            mode: "onChange",
            resolver: yupResolver(heroSchema)
        }
    )

    const onHandleCreateSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { nickname, real_name, superpowers, catch_phase, origin_description } = getValues()
        const formData = new FormData();
        formData.set('nickname', nickname as string)
        formData.set('real_name', real_name as string)
        formData.set('superpowers', superpowers as string)
        formData.set('catch_phase', catch_phase as string)
        formData.set('origin_description', origin_description as string)

        for (const file of selectedPictures) {
            formData.append('images', file as File);
        }

        createHero(formData)

        setSelectedPictures([])
        reset()
        navigate(`/heroes`)
    }, [createHero, getValues, navigate, reset, selectedPictures]);

    return (
        <Paper elevation={3} sx={{padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' ,}}>
            <Typography component="h1" variant="h5">
                {heroData ? 'Update hero' : 'Create new hero'}
            </Typography>
            <Box
                component='form'
                autoComplete='off'
                maxWidth='md'
                sx={{ width: '100%', marginTop: '1rem',  }}
            >
                <Box sx={{ display: { xs: 'block', sm: 'flex' }, gap: '30px', borderRadius: '10px'}}>
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
                    isSuccess={isSuccess}
                    isError={isError}
                    imagesList={heroData?.images}
                    selectedPictures={selectedPictures}
                    setSelectedPictures={setSelectedPictures}
                />

                <SubmitButton
                    label={heroData ? 'Update hero' : 'Create hero'}
                    onHandleSubmit={onHandleCreateSubmit}
                    isValid={isValid}
                />
            </Box>
        </Paper>
    );
}

// Nickname: Joker
// Real name: Joker
// Phase:“Look, up in the sky, it's a bird, it's a plane, it's Superman!”
// Superpowers:solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...
// Description:he was born Kal - El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor - El, moments before Krypton's destruction...