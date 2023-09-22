import { CardMedia, Box, IconButton } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { IImageListResponseTypes } from 'types/HeroTypes';

interface IFormImagesListPropsTypes {
    imagesList: IImageListResponseTypes[] | File[],
    cancelButton: ((index: number) => Promise<void>) | ((index: number) => void)
}

export const FormImagesList = ({ imagesList, cancelButton }: IFormImagesListPropsTypes) => {

    return (
        <>
            {imagesList
                && <Box sx={{ position: 'relative', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', gap: { xs: '10px', sm: '30px' }, my: '15px'}}>
                    {imagesList.map((file, index) => {
                        const url = (file as IImageListResponseTypes).link ? (file as IImageListResponseTypes).link : URL.createObjectURL(file as File)
                        return (
                            <Box key={index} sx={{ position: 'relative', width: '150px', height: '90px', borderRadius: '4px', overflow: 'hidden' }}>
                                <CardMedia
                                    component='img'
                                    height='100%'
                                    image={url}
                                    alt={`Selected ${index + 1}`}
                                    sx={{ width: '100%', objectFit: 'cover' }}
                                />
                                <IconButton
                                    onClick={() => cancelButton(index)}
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                >
                                    <CancelIcon sx={{ color: '#ff0000b0' }} />
                                </IconButton>
                            </Box>
                        )
                    })}
                </Box>}
        </>
    );
}
