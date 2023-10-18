import { getAllHeroes, getHero, createHero, updateHero, deleteHero } from '../controller/hero.controller.js'
import { Router } from 'express'
import { jwtVerify } from '../middleware/jwtVerify.middleware.js'
// import { jwtRefresh } from '../middleware/jwtRefresh.middleware.js'

const router = Router()

router.get('/api/heroes', getAllHeroes)
router.get('/api/hero/:heroId', jwtVerify,  getHero)
router.post('/api/hero', jwtVerify, createHero)
router.put('/api/hero/:heroId', jwtVerify, updateHero)
router.delete('/api/hero/:heroId', jwtVerify, deleteHero)

export default router