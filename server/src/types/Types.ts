// import { File } from "buffer";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface UserIdRequest extends Request {
    userId?: string
}
export interface IImagesLinksList {
    _id?: string,
    image?: string
}

export interface IImagesList {
    image: string
}

export interface HeroBodyResponse extends Response {
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
    images?: IImagesList[],
    // images?: IImagesLinksList[],
}

export interface UpdateHeroParams extends ParamsDictionary {
    heroId: string
}

export interface HeroBody {
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
    // images: File[],
    images: IImagesList[],
    images_remain: IImagesLinksList[],
}