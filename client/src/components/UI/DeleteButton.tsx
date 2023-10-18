import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useDeleteHeroMutation } from "redux/api/heroesApi";
import { IErrorMessage } from "types/HeroTypes";
import { errorToast, successToast } from "utils/toast";
import { useAppSelector } from "redux/store";

const DeleteButton = () => {
    const id = useParams().id as string
    const accessToken  = useAppSelector((state) => state.authState.accessToken) as string

    const [deleteHero, { isError, isSuccess, data: message, error }] = useDeleteHeroMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            successToast(message?.message as string)
            navigate('/heroes')
        }
        if (isError) {
            const errorMessage = error as IErrorMessage
            errorToast(errorMessage?.data as string)
        }
    }, [isError, isSuccess, message?.message, error, navigate])

    const onDeleteHero = useCallback(async () => {
        await deleteHero({ id, accessToken })
    }, [id, deleteHero, accessToken])

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

export default DeleteButton