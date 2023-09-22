import { File } from "buffer";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface UserIdRequest extends Request {
    userId?: string
}
export interface IImagesLinksList {
    _id?: string,
    link?: string
}

export interface HeroBodyResponse extends Response {
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
    images?: IImagesLinksList[],
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
    images: File[],
    images_remain: string,
    images_deleted: string,
}