import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, Button, CardMedia, Container, IconButton } from '@mui/material';

import { Cancel as CancelIcon } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { successToast, errorToast } from 'utils/toast';
import { Spinner } from 'components/index'
import { IImageListResponseTypes } from 'types/HeroTypes';

const schema = yup.object().shape({
    images: yup
        .mixed()
    // .required()
    // .test("Min test", "Must have at least 1 image", object => typeof object !== 'object')
});

interface IFileUploaderPropsTypes {
    isSuccess: boolean,
    isError: boolean,
    imagesList: IImageListResponseTypes[]
    selectedPictures: File[],
    setSelectedPictures: Dispatch<SetStateAction<File[]>>,
}

export const FileUploader = ({ isSuccess, isError, imagesList, selectedPictures, setSelectedPictures }: IFileUploaderPropsTypes) => {

    const {
        control,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            images: []
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isSuccess) {
            successToast('Image upload successfully')
        }

        if (isError) {
            errorToast('Fail upload image')
        }

    }, [isError, isSuccess])

    const handlePictureSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedPictures((prevSelectedPictures) => [
                ...prevSelectedPictures,
                ...Array.from(files),
            ]);
        }

        setValue('images', Array.of(selectedPictures))
    };

    const handleCancelPicture = (index: number) => {

        setSelectedPictures((prevSelectedPictures) =>
            prevSelectedPictures.filter((_, i) => i !== index)
        );
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexGrow: '1', gap: { xs: '10px', sm: '30px' }, mt: '10px'}}>
            <Controller
                control={control}
                name={'images'}
                rules={{ required: 'Required file' }}
                render={({ field: { value, onChange, ...field } }) => {
                    const isImage = selectedPictures.length < 1 ? '' : value as string
                    return (
                        <Button
                            variant="contained"
                            component="label"

                            sx={{ textAlign: 'center' }}
                        >
                            Upload images
                            <input
                                {...field}
                                multiple
                                {...register('images')}
                                value={isImage}
                                onChange={(event) => {
                                    onChange(handlePictureSelection(event));
                                }}
                                type="file"
                                id="images"
                                hidden
                                accept=".jpg,.jpeg,.webp"
                                style={{ position: 'absolute', zIndex: '-1' }}
                            />
                        </Button>
                    );
                }}
            />
            {/* {errors?.images && <span style={{ color: 'red' }}>{errors?.images?.message || "Error!"}</span>} */}
            {selectedPictures
                && <Box sx={{ height: '100%',position: 'relative', display: 'flex', flexWrap: 'wrap', gap: { xs: '10px', sm: '30px' } }}>
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

            {/* {imagesList
                && <Box sx={{ height: '100%',position: 'relative', display: 'flex', flexWrap: 'wrap', gap: { xs: '10px', sm: '30px' } }}>
                {imagesList.map((image, index) => (
                    <Box key={index} sx={{ position: 'relative', width: '150px', height: '90px', borderRadius: '4px', overflow: 'hidden' }}>
                        <CardMedia
                            component='img'
                            height='100%'
                            image={image?.link}
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
            </Box>} */}
            
        </Box>
    );
};

// interface IPreviewImage {
//     data: IImageListResponseTypes[] | File[],
//     setSelectedPictures: (value: SetStateAction<File[]>) => void
// }

// const previewImages = ({ data, setSelectedPictures }: IPreviewImage) => {

//     const handleCancelPicture = (index: number) => {

//         setSelectedPictures((prevSelectedPictures) =>
//             prevSelectedPictures.filter((_, i) => i !== index)
//         );
//     };

//     return (
//         <Box sx={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: { xs: '10px', sm: '30px' } }}>
//             {data.map((image, index) => (
//                 <Box key={index} sx={{ position: 'relative', width: '150px', height: '90px', borderRadius: '4px', overflow: 'hidden' }}>
//                     <CardMedia
//                         component='img'
//                         height='100%'
//                         image={typeof image !== 'object' ?  URL.createObjectURL(image) : image?.link}
//                         alt={`Selected ${index + 1}`}
//                         sx={{ width: '100%', objectFit: 'cover' }}
//                     />
//                     <IconButton
//                         onClick={() => handleCancelPicture(index)}
//                         sx={{ position: 'absolute', top: 0, right: 0 }}
//                     >
//                         <CancelIcon />
//                     </IconButton>
//                 </Box>
//             ))}
//         </Box>
//     )
// }
