import { registration } from '../controller/user.controller.js';
import { Router } from 'express'
// import jwtVerify from '../middleware/jwtVerify.middleware.js';

const router = Router()
router.post('/api/user/registration', registration)
// router.get('/api/user/:userId', jwtVerify, profile)

export default router