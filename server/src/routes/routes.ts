import { Request, Response, Router } from 'express'
import heroes from './heros.routes.js'
import files from './files.routes.js'
const router = Router()

router.get('/', async (req: Request, res: Response) => res.status(200).json({ message: 'test check is OK' }))

router.use(heroes)
router.use(files)

export default router