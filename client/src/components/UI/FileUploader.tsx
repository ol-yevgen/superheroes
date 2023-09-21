import React, { Dispatch, SetStateAction } from 'react';
import {Controller, Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Box, Button, CardMedia, IconButton } from '@mui/material';

import { Cancel as CancelIcon } from '@mui/icons-material';

interface IFormData {
    images?: any;
    real_name?: string | undefined;
    origin_description?: string | undefined;
    superpowers?: string | undefined;
    catch_phase?: string | undefined;
    nickname: string;
}

interface IFileUploaderPropsTypes {
    control: Control<IFormData, any>,
    selectedPictures: File[],
    setSelectedPictures: Dispatch<SetStateAction<File[]>>,
}

export const FileUploader = ({ selectedPictures, setSelectedPictures }: IFileUploaderPropsTypes) => {


    const handlePictureSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            setSelectedPictures((prevSelectedPictures) => [
                ...prevSelectedPictures,
                ...Array.from(files),
            ]);
        }
        
        const fileNamesList = selectedPictures.map(file => file.name)

        // setValue('images', fileNamesList)
    };

    const handleCancelPicture = (index: number) => {

        setSelectedPictures((prevSelectedPictures) =>
            prevSelectedPictures.filter((_, i) => i !== index)
        );
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexGrow: '1', gap: { xs: '10px', sm: '30px' }, mt: '10px'}}>
            {/* <Controller
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
            /> */}
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
