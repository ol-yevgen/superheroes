import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model.js'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface MyRequest extends Request {
    userId?: string,
    accessToken?: string | null
}

export const jwtVerify = async (req: MyRequest, res: Response, next: NextFunction) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

    try {
        const authHeader = req.headers.authorization || req.headers.Authorization as string

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'You are not authenticated' })
        }

        const token = authHeader.split(' ')[1];

        const { userId } = <jwt.UserIDJwtPayload>jwt.verify(token, ACCESS_TOKEN_SECRET);

        req.userId = userId
        next()

    } catch (error) {
        if (JSON.parse(JSON.stringify(error)).message === 'jwt expired') {
            try {
                const cookies = req.cookies
                const refreshToken = cookies.refreshToken

                if (!refreshToken) throw createHttpError(401, 'Unauthorized')

                const { userId } = <jwt.UserIDJwtPayload>jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

                if (!userId) throw createHttpError(403, 'Forbidden')

                const foundUser = await User.findById(userId).exec()

                if (!foundUser) throw createHttpError(401, 'Unauthorized')

                const accessToken = jwt.sign(
                    { userId: userId },
                    ACCESS_TOKEN_SECRET,
                    { expiresIn: '10m' }
                )

                req.accessToken = accessToken
                next()

            } catch (error) {
                req.accessToken = null
                next()
            }

        } else {
            next(error)
        }
    }
};
