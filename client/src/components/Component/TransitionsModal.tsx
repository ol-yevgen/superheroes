import { Modal, Backdrop, Box } from '@mui/material';
import { setModal } from 'redux/features/modalSlice';
import { useAppDispatch } from 'redux/store';
import { ITransitionModal } from 'types/HeroTypes';

const TransitionsModal = ({ open, image, handleOpenClose, content, disclaimerClose }: ITransitionModal) => {
    const dispatch = useAppDispatch()

    const closeModal = (link: string) => {
        if (handleOpenClose) {
            handleOpenClose(link)
        }
        if (disclaimerClose) {
            disclaimerClose()
        }
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
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90% ', md: '70%' },
                height: image ? 'auto' : '90%',
                bgcolor: 'background.paper',
                outline: 'none',
                overflowY: image ? 'hidden' : 'scroll',
                borderRadius: '10px',
                // overflow: 'hidden'
            }}>
                {content}
            </Box>

        </Modal>
    )
}

export default TransitionsModal