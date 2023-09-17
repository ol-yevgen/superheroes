import { IconButton } from "@mui/material";
import { useCallback } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

interface DeleteButtonTypes {
    id: string,
}

export const DeleteButton = ({ id, }: DeleteButtonTypes) => {

    const navigate = useNavigate()
    
    return (
        <IconButton
            size="small"
            color="inherit"
            onClick={() => {}}
        >
            <DeleteIcon />
        </IconButton>
    )
}