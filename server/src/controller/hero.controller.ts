import { NextFunction, Request, Response, RequestHandler } from 'express'
import Hero from '../models/hero.model.js'
import mongoose from 'mongoose'
import logger from '../utils/logger.js'
import { UserIdRequest, UpdateHeroParams, HeroBody, IImagesLinksList } from '../types/Types.js'
import { urlList } from '../utils/createImageUrl.js'
import { deleteFiles } from '../utils/deleteFiles.js'

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

        const totalPages = Math.ceil(await Hero.find().count().exec() / 5)
        const heroes = await Hero.find().sort({ createdAt: -1 }).skip(offset).limit(OFFSET_LIMIT).exec()

        if (!heroes) {
            return res.status(400).json({ message: 'No any heroes' })
        }

        const allHeroesShort: IAllHeroesShortType[] = []
        heroes.map(hero => {
            const heroId = hero._id
            allHeroesShort.push({ id: heroId, nickname: hero.nickname, image: hero.images[0].link })
        })

        logger.info('All heroes list download')
        res.status(200).json({ allHeroesShort, totalPages })
    } catch (error) {
        next(error)
    }
}

export const getHero: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const heroId = req.params.heroId

    try {
        if (!mongoose.isValidObjectId(heroId)) {

            logger.error('Invalid hero id')
            return res.status(400).json({ message: 'Invalid hero id' })
        }

        const hero = await Hero.findById(heroId).exec()

        if (!hero) {
            logger.error('Hero not found')
            return res.status(404).json({ message: 'Hero not found' })
        }

        logger.info('Hero info download')
        res.status(200).json(hero)
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
            catch_phase } = req.body

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files provided" });
        }

        const fileList = req.files as Express.Multer.File[]

        const newHero = new Hero({
            nickname: nickname,
            real_name: real_name,
            origin_description: origin_description,
            superpowers: superpowers,
            catch_phase: catch_phase,
            images: urlList(fileList),
        })

        await newHero.save()

        res.json({ message: `Hero has been created` });
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
            images_deleted
        } = req.body

        const fileList = req.files as Express.Multer.File[]
        const listOfRemainImages = JSON.parse(images_remain) as IImagesLinksList[]
        const listOfDeletedImages = JSON.parse(images_deleted) as IImagesLinksList[]
        const listOdNewImages = urlList(fileList)

        const updatedImageList = [...listOfRemainImages, ...listOdNewImages]

        const nicknameExisted = await Hero.findOne({ nickname })

        if (!mongoose.isValidObjectId(heroId)) {
            logger.error('Invalid hero id')
            return res.status(400).json({ message: 'Invalid hero id' })
        }

        const hero = await Hero.findById(heroId).exec()

        if (!hero) {
            logger.error('Hero not found')
            return res.status(400).json({ message: 'Hero not found' })
        }

        if (!nickname
            || !real_name
            || !origin_description
            || !superpowers
            || !catch_phase
        ) {
            logger.error('Some field was not filled up')
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (nicknameExisted && (nicknameExisted.id !== heroId)) {
            logger.error('Hero with same nickname already exist')
            return res.status(400).json({ message: 'Hero with same nickname already exist' })
        }

        hero.nickname = nickname
        hero.real_name = real_name
        hero.origin_description = origin_description
        hero.superpowers = superpowers
        hero.catch_phase = catch_phase
        hero.images = updatedImageList
        
        await hero.save()

        deleteFiles(listOfDeletedImages)

        res.status(201).json({ message: 'Hero has been updated' })
        logger.info('Hero has been updated')

    } catch (error) {
        next(error)
    }
}

export const deleteHero: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const heroId = req.params.heroId

    try {

        if (!mongoose.isValidObjectId(heroId)) {
            logger.error('Invalid hero id')
            return res.status(404).json({ message: 'Invalid hero id' })
        }

        const hero = await Hero.findById(heroId).exec()

        if (!hero) {
            logger.error('Hero not found')
            return res.status(404).json({ message: 'Hero not found' })
        }

        deleteFiles(hero.images)

        await hero.deleteOne()

        logger.info('Hero has been deleted')
        res.status(201).json({ id: heroId, message: 'Hero has been deleted' })
    } catch (error) {
        next(error)
    }
}
