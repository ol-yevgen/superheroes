import { NextFunction, Request, Response } from 'express'
import User from '../models/user.model.js'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import bcrypt from 'bcryptjs';
import logger from '../utils/logger.js';
// import logger from '../utils/logger.js';

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}

interface RegisterUserBody extends Request {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

export const login = async (req: RegisterUserBody, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = await User.findOne({ email }).exec()

        if (!user) {
            return res.status(400).json({ message: 'User with such email not found' })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(401).json({ message: 'Wrong password' })

        const accessToken = jwt.sign(
            { userId: user._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        )

        const refreshToken = jwt.sign(
            {
                userId: user._id,
            },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        // Create secure cookie with refresh token 
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //accessible only by web server 
            sameSite: 'none',
            secure: true, //https
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
            .status(201)
            .json(
                {
                    accessToken,
                    userInfo: {
                        role: user.role,
                        userId: user._id,
                        userName: user.firstName + ' ' + user.lastName,
                    },
                    message: `Welcome, ${user.firstName}`
                })

    } catch (error) {
        next(error)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies

        if (!cookies?.refreshToken) return res.sendStatus(204) //No content

        const { userId } = <jwt.UserIDJwtPayload>jwt.verify(cookies?.refreshToken, REFRESH_TOKEN_SECRET)

        if (!userId) throw createHttpError(403, 'Forbidden')

        const foundUser = await User.findById(userId).exec()

        res
            .clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(201)
            .json({ accessToken: null, message: `Bye, ${foundUser?.firstName.split(' ')[0]}!` })
        // res.status(201).json(`Bye, ${userName.split(' ')[0]}!`)
        logger.info('User logout')

    } catch (error) {
        next(error)
    }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies
        const refreshToken = cookies.refreshToken

        if (!refreshToken) throw createHttpError(401, 'Unauthorized')

        const { userId } = <jwt.UserIDJwtPayload>jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

        if (!userId) return res.status(403).json({ message: 'Forbidden' })

        const user = await User.findById(userId).exec()

        if (!user) return res.status(401).json({ message: 'Unauthorized' })

        const accessToken = jwt.sign(
            { userId: user._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        )
        res.status(201).json({ accessToken })
        logger.info('Send refresh access token')
    } catch (error) {
        next(error)
    }

}

