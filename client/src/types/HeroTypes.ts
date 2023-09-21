export interface IImageListResponseTypes {
    _id?: string,
    link: string
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
    images?: IImageListResponseTypes[] | [] | any
}

export interface IHeroesResponseTypes {
    allHeroesShort: IHeroShortTypes[],
    totalPages: number,
    message?: string
}

export interface ICreateUpdateFormPropsTypes {
    heroData: IHeroFullInfoTypes | null | undefined,
}

export interface ITransitionModal {
    open: boolean,
    image: string,
    data?: IHeroFullInfoTypes,
    handleOpenClose: (link: string) => void,
}