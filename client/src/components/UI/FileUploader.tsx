import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {Controller, Control, FieldErrors } from 'react-hook-form';
import { Box, Button, CardMedia, IconButton } from '@mui/material';

import { Cancel as CancelIcon } from '@mui/icons-material';

export interface IFormData {
    nickname: string,
    real_name: string,
    superpowers: string,
    catch_phase: string,
    origin_description: string,
    images: any
}

interface IFileUploaderPropsTypes {
    control: Control<IFormData, any>,
    selectedPictures: File[],
    setSelectedPictures: Dispatch<SetStateAction<File[]>>,
}

export const FileUploader = ({ selectedPictures, setSelectedPictures, control }: IFileUploaderPropsTypes) => {

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

    return (
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
    )
}