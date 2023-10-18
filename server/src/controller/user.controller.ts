import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
// import Hero from '../models/hero.model.js'
import User from '../models/user.model.js'

// import { NextFunction, Request, Response } from 'express-serve-static-core'
// import logger from '../utils/logger.js'

// interface UserIdRequest extends Request {
//     userId?: string
// }

interface RegisterUserBody {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
}

export const registration: RequestHandler<unknown, unknown, RegisterUserBody, unknown> = async (req, res, next) => {

    try {
        const { firstName, lastName, email, password } = req.body

        const emailExisted = await User.findOne({ email })

        if (!firstName || !lastName || !password) {
            return res.status(409).json({ message: 'Some parameters missing' })
        }

        if (emailExisted) {
            return res.status(409).json({ message: 'User with same email already exist' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'user'
        })

        await newUser.save()

        res.status(201).json({ message: `User with name ${firstName} has been registered` })
    } catch (error) {
        next(error)
    }
}

// export const profile = async (req: UserIdRequest, res: Response, next: NextFunction) => {

//     try {
//         const _id = req.userId

//         const user = await User.findById({_id})
//         const tasksTotalByUser = await Task.find({ owner: _id })
//         const doneTotalByUser = await Task.find({ owner: _id }).find({done: true})
//         const inProgressTotalByUser = await Task.find({ owner: _id }).find({done: false})

//         if (!tasksTotalByUser) {
//             return res.status(409).json({ message: 'No any tasks' })
//         }

//         res.status(201).json(
//             {
//                 userEmail: user?.email,
//                 totalTasks: tasksTotalByUser.length,
//                 doneTasks: doneTotalByUser.length,
//                 inProgressTasks: inProgressTotalByUser.length
//             })
//     } catch (error) {
//         next(error)
//     }
// }