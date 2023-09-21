import { getAllHeroes, getHero, createHero, updateHero, deleteHero } from '../controller/hero.controller.js'
import { Router } from 'express'
import { upload } from '../middleware/upload.middleware.js'

const router = Router()

router.get('/api/heroes', getAllHeroes)
router.get('/api/hero/:heroId', getHero)
router.post('/api/hero', upload.array("images", 100), createHero)
router.put('/api/hero/:heroId', upload.array("images", 100), updateHero)
router.delete('/api/hero/:heroId', deleteHero)

export default router