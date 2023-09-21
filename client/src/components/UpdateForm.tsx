import { Typography, Paper, Box, Button, CardMedia, IconButton } from '@mui/material';
import { Input, SubmitButton, FileUploader } from "components/index";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {  useParams } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useState } from "react"
import { heroUpdateSchema } from 'schemas/heroSchema'
import { useUpdateHeroMutation } from 'redux/api/heroesApi';
import { ICreateUpdateFormPropsTypes, IImageListResponseTypes } from 'types/HeroTypes';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { useAppDispatch } from 'redux/store';
import { setModal } from 'redux/features/modalSlice';

export const UpdateForm = ({ heroData }: ICreateUpdateFormPropsTypes) => {
    const heroId = useParams().id as string
    const dispatch = useAppDispatch()

    const [updateHero, { isError, isSuccess, error, data}] = useUpdateHeroMutation()
    const [imageListToDelete, setImageListToDelete] = useState<IImageListResponseTypes[]>([]);
    const [imageLinksRemain, setImageLinksRemain] = useState<IImageListResponseTypes[]>(heroData?.images)
    const [selectedPictures, setSelectedPictures] = useState<File[]>([]);

    // console.log(JSON.stringify(data));

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
                nickname: heroData?.nickname,
                real_name: heroData?.real_name,
                superpowers: heroData?.superpowers,
                catch_phase: heroData?.catch_phase,
                origin_description: heroData?.origin_description,
                images: [] ,
                images_remain: [] as IImageListResponseTypes[],
            },
            mode: "onChange",
            resolver: yupResolver(heroUpdateSchema)
        }
        )

    useEffect(() => {
        if (selectedPictures.length === 0) {
            resetField('images')
        }
    }, [resetField, selectedPictures])
   
    const handleDeleteExistingPicture = async (index: number) => {

        setImageListToDelete([...imageListToDelete, imageLinksRemain[index]]);

        setImageLinksRemain((prevRemainImage) =>
            prevRemainImage.filter((_, i) => i !== index)
        );
    };

    const onHandleUpdateSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
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
        formData.append('images_remain', JSON.stringify(imageLinksRemain));
        
        updateHero({ formData, heroId });

        setSelectedPictures([])
        dispatch(setModal())
        reset()
    }, [updateHero, getValues, reset, selectedPictures, heroId, imageLinksRemain, dispatch]);
    // }, [updateHero, getValues, reset, selectedPictures, heroId, imageLinksRemain, dispatch]);

    return (
        <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
                Update hero {heroData?.nickname}
            </Typography>
            {isError && <Box component='span'>Error</Box>}
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

                {imageLinksRemain
                    && <Box sx={{  position: 'relative', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: { xs: '10px', sm: '30px' }, my: '30' }}>
                        {imageLinksRemain.map((image, index) => (
                            <Box key={index} sx={{ position: 'relative', width: '150px', height: '90px', borderRadius: '4px', overflow: 'hidden' }}>
                                <CardMedia
                                    component='img'
                                    height='100%'
                                    image={image.link}
                                    alt={`Selected ${index + 1}`}
                                    sx={{ width: '100%', objectFit: 'cover' }}
                                />
                                <IconButton
                                    onClick={() => handleDeleteExistingPicture(index)}
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                >
                                    <CancelIcon sx={{ color: '#ff0000b0'}}/>
                                </IconButton>
                            </Box>
                        ))}
                    </Box>}

                <FileUploader
                    control={control}
                    selectedPictures={selectedPictures}
                    setSelectedPictures={setSelectedPictures}
                />

                <SubmitButton
                    label={'Update hero'}
                    onHandleSubmit={onHandleUpdateSubmit}
                    isValid={isValid}
                />
            </Box>
        </Paper>
    );
}