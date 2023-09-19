import { FC, useEffect } from "react"
import { useCreateHeroMutation } from "redux/api/heroesApi"
import { successToast, errorToast } from 'utils/toast'
import { CreateUpdateForm } from 'components';

const defaultData =  {
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phase: '',
    images: [{ link: ''}]
}

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
        
        <CreateUpdateForm
            createOrUpdateHero={createHero}
            heroData={defaultData}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
        />
    )
}