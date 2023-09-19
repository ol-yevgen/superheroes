import { NextFunction, Request, Response, RequestHandler } from 'express'
import Hero from '../models/hero.model.js'
import mongoose from 'mongoose'
import logger from '../utils/logger.js'
import { UserIdRequest, UpdateHeroParams, HeroUpdateBody } from '../types/Types.js'
import fs from 'fs'
// import createHttpError from 'http-errors'


interface IAllHeroesShortType {
    id: mongoose.Types.ObjectId,
    nickname: string,
    image?: string
}

const OFFSET_LIMIT = +(process.env.OFFSET_LIMIT as string) as number
const BASE_API = process.env.BASE_API_URL as string

export const getAllHeroes: RequestHandler = async (req: UserIdRequest, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page || 1
        const offset = (+page - 1) * OFFSET_LIMIT

        // const heroes = await Hero.find({ owner: req.userId }).exec()
        const totalPages = Math.round(await Hero.find().count().exec() / 5)
        const heroes = await Hero.find().sort({ createdAt: -1 }).skip(offset).limit(OFFSET_LIMIT).exec()

        if (!heroes) {
            return res.status(400).json({ message: 'No any heroes' })
        }

        const allHeroesShort: IAllHeroesShortType[] = []
        heroes.map(hero => {
            const heroId = hero._id 
            allHeroesShort.push({ id: heroId, nickname: hero.nickname, image: hero.images[0].link})
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

export const createHero = async (req: Request, res: Response, next: NextFunction) => {

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
        // res.json({ url: `uploads/${req.file?.filename}`, message: `Files have been upload` })

        // Save image metadata to MongoDB
        // const savedImages = await Promise.all(
        //     imageUrls.map(async (url: string) => {
        //         const image = new ImageModel({ filename: path.basename(url), url });
        //         return await image.save();
        //     })
        // );
        const urlList = fileList.map((file) => {
            const { originalname, path } = file
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = path + '.' + ext
            fs.renameSync(path, newPath)

            return { link: BASE_API + '/' + newPath }
        })

        const newHero = new Hero({
            nickname: nickname,
            real_name: real_name,
            origin_description: origin_description,
            superpowers: superpowers,
            catch_phase: catch_phase,
            images: urlList,
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

export const updateHero: RequestHandler<UpdateHeroParams, unknown, HeroUpdateBody, unknown> = async (req, res, next) => {
    const heroId = req.params.heroId
    const { nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phase,
        images
    } = req.body

    try {
        const nicknameExisted = await Hero.findOne({ nickname })

        const hero = await Hero.findById(heroId).exec()

        if (!hero) {
            logger.error('Hero not found')
            return res.status(400).json({ message: 'Hero not found' })
        }

        if (!mongoose.isValidObjectId(heroId)) {
            logger.error('Invalid hero id')
            return res.status(400).json({ message: 'Invalid hero id' })
        }
        
        if (!nickname
            || !real_name
            || !origin_description
            || !superpowers
            || !catch_phase
            || !images
        ) {
            logger.error('Some field was not filled up')
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (nicknameExisted && (nicknameExisted.id !== heroId)) {
            logger.error('Try to update Hero with same nickname')
            return res.status(400).json({ message: 'Hero with same nickname already exist' })
        }

        hero.nickname = <string>nickname
        hero.real_name = <string>real_name
        hero.origin_description = <string>origin_description
        hero.superpowers = <string>superpowers
        hero.catch_phase = <string>catch_phase

        await hero.save()

        logger.info('Hero has been updated')
        res.status(201).json({ message: 'Hero has been updated' })

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

        await hero.deleteOne()

        logger.error('Hero has been deleted')
        return res.status(201).json({ message: 'Hero has been deleted' })
    } catch (error) {
        next(error)
    }
}
