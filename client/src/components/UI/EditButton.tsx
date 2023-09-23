import { IconButton } from "@mui/material";
import { setModal } from "redux/features/modalSlice";
import { useAppDispatch } from "redux/store";
import EditIcon from '@mui/icons-material/Edit';

export const EditButton = ( ) => {
    const dispatch = useAppDispatch()

    const openModal = () => {
        dispatch(setModal())
    }
    return (
        <IconButton
            size="small"
            color="inherit"
            onClick={() => openModal()}
        >
            <EditIcon />
        </IconButton>

    )
}

export default EditButton