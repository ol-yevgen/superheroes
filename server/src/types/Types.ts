import { Request, Response } from "express";

export interface UserIdRequest extends Request {
    userId?: string
}
interface IImagesLinksList {
    link?: string
}

export interface HeroBodyResponse extends Response {
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
    images?: IImagesLinksList[]
}

export interface UpdateHeroParams {
    heroId: string
}

export interface HeroUpdateBody {
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
    images?: IImagesLinksList[]
}