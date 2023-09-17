import { Modal, Backdrop, Box, Fade, CardMedia } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    outline: 'none'
};

interface ITransitionModal {
    open: boolean,
    image: string,
    handleClose: () => void
}

export const TransitionsModal = ({ open, image, handleClose }: ITransitionModal) => {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{cursor: 'pointer'}}
        >
            <Box sx={style}>
                <CardMedia
                    component='img'
                    width='100%'
                    height='100%'
                    image={image}
                    alt={image}
                />
            </Box>
        </Modal>
    );
}