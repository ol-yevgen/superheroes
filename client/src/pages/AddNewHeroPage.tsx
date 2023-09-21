import { Typography, Paper, Box, Button, CardMedia, IconButton } from '@mui/material';
import { Input, SubmitButton, FileUploader } from "components/index";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { IImageListResponseTypes } from 'types/HeroTypes';
import { heroSchema } from 'schemas/heroSchema'
import { useCreateHeroMutation } from 'redux/api/heroesApi';
import { Cancel as CancelIcon } from '@mui/icons-material';

export const AddNewHeroPage = () => {
    const [createHero, { isError, isSuccess, isLoading }] = useCreateHeroMutation()

    const [selectedPictures, setSelectedPictures] = useState<File[]>([]);
    const navigate = useNavigate()

    const {
        control,
        register,
        getValues,
        // setValue,
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
            resolver: yupResolver(heroSchema)
        }
    )

    const handlePictureSelection = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            setSelectedPictures((prevSelectedPictures) => [
                ...prevSelectedPictures,
                ...Array.from(files),
            ]);
        }

    };

    const handleCancelPicture = (index: number) => {

        setSelectedPictures((prevSelectedPictures) =>
            prevSelectedPictures.filter((_, i) => i !== index)
        );
    };


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

                {/* <FileUploader
                    register={register}
                    selectedPictures={selectedPictures}
                    setSelectedPictures={setSelectedPictures}
                /> */}

                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexGrow: '1', gap: { xs: '10px', sm: '30px' }, mt: '10px' }}>
                    <Controller
                        control={control}
                        name={'images'}
                        rules={{ required: 'Required file' }}
                        render={({ field: { value, onChange, ...field } }) => {
                            const isImage = selectedPictures.length < 1 ? '' : value as string
                            return (
                                <input
                                    {...field}
                                    multiple
                                    value={(value as any)?.File}
                                    onChange={(event) => {
                                        const files = event.target.files as FileList
                                        onChange(files[0]);
                                        handlePictureSelection(event)
                                    }}
                                    type="file"
                                    id="images"
                                    hidden
                                    accept=".jpg,.jpeg,.webp"
                                    style={{ position: 'absolute', zIndex: '-1' }}
                                />
                            );
                        }}
                    />

                    <Button
                        variant="contained"
                        component="label"
                        htmlFor='images'
                        sx={{ textAlign: 'center' }}
                    >
                        UPLOAD
                    </Button>

                    {/* {errors?.images && <span style={{ color: 'red' }}>{errors?.images?.message || "Error!"}</span>} */}
                    {selectedPictures
                        && <Box sx={{ height: '100%', position: 'relative', display: 'flex', flexWrap: 'wrap', gap: { xs: '10px', sm: '30px' } }}>
                            {selectedPictures.map((file, index) => (
                                <Box key={index} sx={{ position: 'relative', width: '150px', height: '90px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <CardMedia
                                        component='img'
                                        height='100%'
                                        image={URL.createObjectURL(file)}
                                        alt={`Selected ${index + 1}`}
                                        sx={{ width: '100%', objectFit: 'cover' }}
                                    />
                                    <IconButton
                                        onClick={() => handleCancelPicture(index)}
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>}
                </Box>

                <Button onClick={() => console.log(getValues(), selectedPictures)}>Get data</Button>

                <SubmitButton
                    label={'Create hero'}
                    onHandleSubmit={onHandleCreateSubmit}
                    isValid={isValid}
                />
            </Box>
        </Paper>
    );
}