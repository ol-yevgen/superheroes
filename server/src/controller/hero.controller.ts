import { NextFunction, Request, Response, RequestHandler } from 'express'
import Hero from '../models/hero.model.js'
import mongoose from 'mongoose'
import logger from '../utils/logger.js'
// import createHttpError from 'http-errors'

interface UserIdRequest extends Request {
    userId?: string
}
interface IImagesLinksList {
    link?: string
}

interface IAllHeroesShortType {
    id: mongoose.Types.ObjectId,
    nickname: string,
    image?: string
}

const offsetLimit = +(process.env.OFFSET_LIMIT as string) as number

export const getAllHeroes: RequestHandler = async (req: UserIdRequest, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page || 1
        const offset = (+page - 1) * offsetLimit

        // const heroes = await Hero.find({ owner: req.userId }).exec()
        const totalPages = Math.round(await Hero.find().count().exec() / 5)
        const heroes = await Hero.find().skip(offset).limit(offsetLimit).exec()

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

interface HeroBodyResponse extends Response {
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
    images?: IImagesLinksList[]
}

export const createHero = async (req: UserIdRequest, res: HeroBodyResponse, next: NextFunction) => {

    try {
        const { nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phase,
            images
        } = req.body

        // const nicknameExisted = await Hero.findOne({ nickname }).findOne({ owner: req.userId })
        const nicknameExisted = await Hero.findOne({ nickname })

        if (!nickname
            || !real_name
            || !origin_description
            || !superpowers
            || !catch_phase
        ) {
            logger.error('Some field was not filled up')
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (nicknameExisted) {
            logger.error('Try to create Hero with same nickname')
            return res.status(400).json({ message: 'Hero with same nickname already exist' })
        }

        const newHero = new Hero({
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phase,
            images,
            owner: req.userId
        })

        await newHero.save()

        logger.info('Hero has been created')
        res.status(201).json({ message: `Hero has been created` })
    } catch (error) {
        next(error)
    }
}

interface UpdateHeroParams {
    heroId: string
}

interface HeroBody {
    nickname?: string,
    real_name?: string,
    origin_description?: string,
    superpowers?: string,
    catch_phase?: string,
}

export const updateHero: RequestHandler<UpdateHeroParams, unknown, HeroBody, unknown> = async (req, res, next) => {
    const heroId = req.params.heroId
    const { nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phase } = req.body

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
