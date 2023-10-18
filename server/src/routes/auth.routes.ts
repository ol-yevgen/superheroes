import { login, logout, refresh } from '../controller/auth.controller.js'
import { Router } from 'express'

const router = Router()
router.post('/api/auth/login', login)
router.get('/api/auth/refresh', refresh)
router.post('/api/auth/logout', logout)

export default router