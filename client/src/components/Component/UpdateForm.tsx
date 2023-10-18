import { Typography, Paper, Box } from '@mui/material';
import { Input, SubmitButton, FileUploader, FormImagesList, Spinner } from "components/index";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useState } from "react"
import { heroUpdateSchema } from 'schemas/heroSchema'
import { useUpdateHeroMutation } from 'redux/api/heroesApi';
import { ICreateUpdateFormPropsTypes, IImageListResponseTypes, IErrorMessage } from 'types/HeroTypes';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { setModal } from 'redux/features/modalSlice';
import { convertToBase64 } from 'utils/base64';
import { successToast, errorToast } from 'utils/toast';

const UpdateForm = ({ heroData }: ICreateUpdateFormPropsTypes) => {
    const id = useParams().id as string
    const dispatch = useAppDispatch()

    const accessToken = useAppSelector((state) => state.authState.accessToken) as string
    
    const [updateHero, { isLoading, isError, isSuccess, error, data: message }] = useUpdateHeroMutation()
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
        if (isSuccess) {
            successToast(message?.message as string)
            dispatch(setModal())
            setSelectedPictures([])
            reset()
        }
        if (isError) {
            const errorMessage = error as IErrorMessage

            errorToast(errorMessage?.data as string)
        }
    }, [isError, isSuccess, message?.message, error, reset, dispatch])

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
        setImageLinksRemain((prevRemainImage) =>
            prevRemainImage.filter((_, i) => i !== index)
        );
    };

    const onHandleUpdateSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const base64 = await convertToBase64(selectedPictures)
        const formData = JSON.parse(JSON.stringify(getValues()))
        formData.images = base64
        formData.images_remain = imageLinksRemain

        if (selectedPictures.length !== 0 || imageLinksRemain.length !== 0) {
            updateHero({ formData, id, accessToken })
        }

    }, [updateHero, getValues, selectedPictures, id, imageLinksRemain, accessToken]);

    return (
        <Paper elevation={3} sx={{ minHeight: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    <Typography component="span" sx={{ color: 'red' }}>
                        Please, choose at least one picture
                    </Typography>}

                {isLoading
                    ? <Spinner />
                    : <SubmitButton
                        label={'Update hero'}
                        onHandleSubmit={onHandleUpdateSubmit}
                        isValid={isValid && !errorMessage}
                    />
                }

            </Box>
        </Paper>
    );
}

export default UpdateForm
