import { Typography, Paper, Box } from '@mui/material';
import { Input, SubmitButton, FileUploader, FormImagesList } from "components/index";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useState } from "react"
import { heroUpdateSchema } from 'schemas/heroSchema'
import { useUpdateHeroMutation } from 'redux/api/heroesApi';
import { ICreateUpdateFormPropsTypes, IImageListResponseTypes } from 'types/HeroTypes';
import { useAppDispatch } from 'redux/store';
import { setModal } from 'redux/features/modalSlice';

export const UpdateForm = ({ heroData }: ICreateUpdateFormPropsTypes) => {
    const heroId = useParams().id as string
    const dispatch = useAppDispatch()

    const [updateHero, { isError, isSuccess, error, data }] = useUpdateHeroMutation()
    const [imageListToDelete, setImageListToDelete] = useState<IImageListResponseTypes[]>([]);
    const [imageLinksRemain, setImageLinksRemain] = useState<IImageListResponseTypes[]>(heroData?.images)
    const [selectedPictures, setSelectedPictures] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState<boolean>(false)

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
                images: [],
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

    useEffect(() => {
        if (selectedPictures.length === 0 && imageLinksRemain.length === 0) {
            setErrorMessage(true)
        } else {
            setErrorMessage(false)
        }
    }, [selectedPictures, imageLinksRemain])

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
        formData.append('images_remain', JSON.stringify(imageLinksRemain));
        formData.append('images_deleted', JSON.stringify(imageListToDelete));

        for (const file of selectedPictures) {
            formData.append('images', file as File);
        }

        if (selectedPictures.length !== 0 || imageLinksRemain.length !== 0) {
            updateHero({ formData, heroId });
            setSelectedPictures([])
            dispatch(setModal())
            reset()
        }

    }, [updateHero, getValues, reset, selectedPictures, heroId, imageLinksRemain, imageListToDelete, dispatch]);

    return (
        <Paper elevation={3} sx={{ minHeight: '100%',  padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant='h6' >
                Update hero
                <Box component='span' fontWeight='bold' ml='10px' fontFamily='monospace'>
                    {heroData?.nickname}
                </Box>
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

                <FormImagesList imagesList={imageLinksRemain} cancelButton={handleDeleteExistingPicture} />

                <FileUploader
                    control={control}
                    selectedPictures={selectedPictures}
                    setSelectedPictures={setSelectedPictures}
                />

                {errorMessage &&
                    <Typography component="span" sx={{color: 'red'}}>
                        Please, choose at least one picture
                    </Typography>}

                <SubmitButton
                    label={'Update hero'}
                    onHandleSubmit={onHandleUpdateSubmit}
                    isValid={isValid}
                />
            </Box>
        </Paper>
    );
}


