export interface IImageListTypes {
    _id: string,
    link: string
}

export interface IHeroShortTypes {
    id: string,
    nickname: string,
    image: string
}
export interface IHeroFullInfoTypes {
    id: string,
    nickname: string,
    real_name: string,
    origin_description: string,
    superpowers: string,
    catch_phase: string,
    images: IImageListTypes[]
}

export interface IHeroesResponseTypes {
    allHeroesShort: IHeroShortTypes[],
    totalPages: number,
    message?: string
}