import { FC, useEffect } from "react"
import { useCreateHeroMutation } from "redux/api/heroesApi"
import { successToast, errorToast } from 'utils/toast'
import { CreateUpdateForm } from 'components';

export const AddNewHeroPage: FC = () => {
    const [createHero, { isLoading, isError, isSuccess }] = useCreateHeroMutation()

    useEffect(() => {
        if (isSuccess) {
            successToast('Hero create successfully')
        }

        if (isError) {
            errorToast('Hero did not created')
        }

    }, [isSuccess, isError])

    return (
        
        <CreateUpdateForm heroData={null}/>
    )
}