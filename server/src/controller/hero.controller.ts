import { NextFunction, Request, Response, RequestHandler } from 'express'
import Hero from '../models/hero.model.js'
import mongoose from 'mongoose'
import logger from '../utils/logger.js'
import { UserIdRequest, UpdateHeroParams, HeroBody } from '../types/Types.js'

interface IAllHeroesShortType {
    id: mongoose.Types.ObjectId,
    nickname: string,
    image?: string
}

const OFFSET_LIMIT = +(process.env.OFFSET_LIMIT as string) as number

export const getAllHeroes: RequestHandler = async (req: UserIdRequest, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page || 1
        const offset = (+page - 1) * OFFSET_LIMIT

        const totalPages = Math.ceil(await Hero.find().count().exec() / OFFSET_LIMIT)
        const heroes = await Hero.find().sort({ createdAt: -1 }).skip(offset).limit(OFFSET_LIMIT).exec()

        if (!heroes) {
            return res.status(400).json('No any heroes')
        }

        const allHeroesShort: IAllHeroesShortType[] = []

        heroes.map(hero => {
            const heroId = hero._id
            allHeroesShort.push({ id: heroId, nickname: hero.nickname, image: hero.images[0].image  })
        })

        logger.info('All heroes list download')
        res.status(200).json({ allHeroesShort, totalPages, message: 'No any heroes' })
    } catch (error) {
        next(error)
    }
}

interface AccessTokenRequest extends Request {
    accessToken?: string
}

export const getHero: RequestHandler = async (req: AccessTokenRequest, res: Response, next: NextFunction) => {
    
    try {
        const accessToken = req.accessToken
        const heroId = req.params.heroId

        if (!mongoose.isValidObjectId(heroId)) {

            logger.error('Invalid hero id')
            return res.status(400).json('Invalid hero id')
        }

        const hero = await Hero.findById(heroId).exec()

        if (!hero) {
            logger.error('Hero not found')
            return res.status(404).json('Hero not found')
        }

        logger.info('Hero info download')
        res.status(200).json({hero, accessToken})
    } catch (error) {
        next(error)
    }
}

export const createHero: RequestHandler<UpdateHeroParams, unknown, HeroBody, unknown> = async (req, res, next) => {

    try {
        const { nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phase,
            images
        } = req.body

        const nicknameExisted = await Hero.findOne({ nickname })

        if (!nickname
            || !real_name
            || !origin_description
            || !superpowers
            || !catch_phase
        ) {
            logger.error('Some field was not filled up')
            return res.status(400).json('All fields are required')
        }

        if (nicknameExisted) {
            return res.status(400).json('Hero with same nickname already exist')
        }

        const newHero = new Hero({
            nickname: nickname,
            real_name: real_name,
            origin_description: origin_description,
            superpowers: superpowers,
            catch_phase: catch_phase,
            images: images,
        })

        await newHero.save()

        const newHeroId = await Hero.findOne({ nickname }).exec()

        res.json({ heroId: newHeroId?._id, message: `Hero has been created` });
        logger.info('File has been upload')
    } catch (error) {
        console.error("Error saving images:", error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error)
    }
}

export const updateHero: RequestHandler<UpdateHeroParams, unknown, HeroBody, unknown> = async (req, res, next) => {

    try {
        const heroId = req.params.heroId
        const { nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phase,
            images_remain,
            images
        } = req.body

        const updatedImageList = [...images_remain, ...images]

        const nicknameExisted = await Hero.findOne({ nickname })

        if (!mongoose.isValidObjectId(heroId)) {
            logger.error('Invalid hero id')
            return res.status(400).json('Invalid hero id')
        }

        const hero = await Hero.findById(heroId).exec()

        if (!hero) {
            logger.error('Hero not found')
            return res.status(400).json('Hero not found')
        }

        if (!nickname
            || !real_name
            || !origin_description
            || !superpowers
            || !catch_phase
            
        ) {
            logger.error('Some field was not filled up')
            return res.status(400).json('All fields are required')
        }

        if (nicknameExisted && (nicknameExisted.id !== heroId)) {
            logger.error('Hero with same nickname already exist')
            return res.status(400).json('Hero with same nickname already exist')
        }

        hero.nickname = nickname
        hero.real_name = real_name
        hero.origin_description = origin_description
        hero.superpowers = superpowers
        hero.catch_phase = catch_phase
        hero.images = updatedImageList
        
        await hero.save()

        res.status(201).json({ message: `Hero ${hero.nickname} has been updated` })
        logger.info(`Hero ${hero.nickname} has been updated`)

    } catch (error) {
        next(error)
    }
}

export const deleteHero: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const heroId = req.params.heroId

    try {

        if (!mongoose.isValidObjectId(heroId)) {
            logger.error('Invalid hero id')
            return res.status(404).json('Invalid hero id')
        }

        const hero = await Hero.findById(heroId).exec()

        if (!hero) {
            logger.error('Hero not found')
            return res.status(404).json('Hero not found')
        }

        await hero.deleteOne()

        logger.info('Hero has been deleted')
        res.status(201).json({ message: `Hero ${hero.nickname} has been deleted` })
    } catch (error) {
        next(error)
    }
}
