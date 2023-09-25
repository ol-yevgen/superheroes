import { getAllHeroes, getHero, createHero, updateHero, deleteHero } from '../controller/hero.controller.js'
import { Router } from 'express'

const router = Router()

router.get('/api/heroes', getAllHeroes)
router.get('/api/hero/:heroId', getHero)
router.post('/api/hero', createHero)
router.put('/api/hero/:heroId', updateHero)
router.delete('/api/hero/:heroId', deleteHero)

export default router