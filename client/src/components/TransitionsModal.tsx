import { Modal, Backdrop, Box, CardMedia } from '@mui/material';
import { setModal } from 'redux/features/modalSlice';
import { useAppDispatch } from 'redux/store';
import { ITransitionModal } from 'types/HeroTypes';
import { CreateUpdateForm } from './CreateUpdateForm';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '90%',
    bgcolor: 'background.paper',
    outline: 'none',
    overflowY: 'scroll'
};

export const TransitionsModal = ({ open, image, handleOpenClose, data }: ITransitionModal) => {
    const dispatch = useAppDispatch()

    const closeModal = (link: string) => {
        handleOpenClose(link)
        dispatch(setModal())
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => closeModal('')}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{ cursor: 'pointer', }}
        >
            <Box sx={style}>
                {image
                    ? <CardMedia
                        component='img'
                        width='100%'
                        height='100%'
                        image={image}
                        alt={image}
                    />
                    : < CreateUpdateForm heroData={data} /> 
                    
                }
            </Box>
        </Modal>
    );
}
