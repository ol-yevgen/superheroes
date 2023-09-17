import { getAllHeroes, getHero, createHero, updateHero, deleteHero } from '../controller/hero.controller.js'
import { Router } from 'express'
// import jwtVerify from '../middleware/jwtVerify.middleware.js'

const router = Router()

// router.use(jwtVerify)

router.get('/api/heroes', getAllHeroes)
router.get('/api/heroes/:heroId', getHero)
router.post('/api/heroes', createHero)
router.patch('/api/heroes/:heroId', updateHero)
router.delete('/api/heroes/:heroId', deleteHero)

export default router