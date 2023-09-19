import { Typography, Paper, Box } from '@mui/material';
import { Input, SubmitButton, FileUploader } from "components/index";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from "react"
import { IHeroFullInfoTypes, IImageListResponseTypes } from 'types/HeroTypes';
import { heroSchema } from 'schemas/heroSchema'

interface ICreateUpdateFormPropsTypes {
    createOrUpdateHero: (arg: FormData) => void,
    heroData: IHeroFullInfoTypes | null,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean
}

export const CreateUpdateForm = ({ createOrUpdateHero, heroData, isLoading, isError, isSuccess }: ICreateUpdateFormPropsTypes) => {
    const [selectedPictures, setSelectedPictures] = useState<File[]>([]);

    const navigate = useNavigate()
    const isHeroData = heroData?.nickname !== ''

    const {
        register,
        getValues,
        formState: {
            isSubmitSuccessful,
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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line
    }, [isSubmitSuccessful]);

    const onHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

        createOrUpdateHero(formData)

        setSelectedPictures([])
        reset()
        navigate('/heroes')
    };

    return (
        <Paper  elevation={3} sx={{ height: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
                {isHeroData ? 'Update hero' : 'Create new hero'}
            </Typography>
            <Box
                component='form'
                autoComplete='off'
                maxWidth='md'
                sx={{ width: '100%', marginTop: '1rem' }}
            >
                <Box sx={{ display: { xs: 'block', sm: 'flex' }, gap: '30px' }}>
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
                    selectedPictures={selectedPictures}
                    setSelectedPictures={setSelectedPictures}
                />

                <SubmitButton
                    label='Create hero'
                    onHandleSubmit={onHandleSubmit}
                    isValid={isValid}
                />
            </Box>
        </Paper>
    );
}