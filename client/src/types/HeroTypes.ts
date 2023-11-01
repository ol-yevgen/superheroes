import { Dispatch, SetStateAction } from 'react'
import { IAccessToken } from 'types/AuthTypes'

export interface IImageListResponseTypes {
    _id?: string,
    image: string
}

export interface IHeroPageReq extends IAccessToken {
    id: string
}

export interface IErrorMessage {
    data: string,
    status: number
}

export interface IResData {
    error?: IErrorMessage,
    message: string,
    heroId?: string
}

export interface IHeroShortTypes {
    id?: string,
    nickname: string,
    image: string
}

export interface IHeroFullInfoTypes {
    _id?: string,
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
    images?: IImageListResponseTypes[] | [] | string | any
}

export interface IHeroFullInfoResponse extends IAccessToken {
    hero: IHeroFullInfoTypes
    message?: string
}

export interface IAddHeroReq extends IAccessToken {
    formData: IHeroFullInfoTypes
}

export interface IHeroesResponseTypes {
    allHeroesShort: IHeroShortTypes[],
    totalPages: number,
    message?: string
}

export interface IUpdateReqData extends IAccessToken {
    formData: FormData,
    id: string
}
export interface ICreateUpdateFormPropsTypes {
    heroData: IHeroFullInfoTypes | null | undefined,
}

export interface ITransitionModal {
    open: boolean,
    image: string | null,
    // data?: IHeroFullInfoTypes,
    handleOpenClose?: (link: string) => void,
    content: JSX.Element,
    disclaimerClose?: () => void
}