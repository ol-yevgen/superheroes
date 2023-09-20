import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useDeleteHeroMutation } from "redux/api/heroesApi";

interface DeleteButtonTypes {
    id: string,
}

export const DeleteButton = () => {
    const heroId = useParams().id as string

    const [ deleteHero, {data}] = useDeleteHeroMutation( )
    const navigate = useNavigate()

    const onDeleteHero = useCallback(() => {
        deleteHero(heroId)
        navigate('/heroes')
    }, [heroId, navigate, deleteHero])

    return (
        <IconButton
            size="small"
            color="inherit"
            onClick={() => onDeleteHero()}
        >
            <DeleteIcon />
        </IconButton>
    )
}