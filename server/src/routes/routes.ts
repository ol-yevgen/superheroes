import { Request, Response, Router } from 'express'
import heroes from './heros.routes.js'
import auth from './auth.routes.js'
import user from './user.routes.js'
const router = Router()

router.get('/', async (req: Request, res: Response) => res.status(200).json({ message: 'test check is OK' }))

router.use(auth)
router.use(user)
router.use(heroes)

export default router