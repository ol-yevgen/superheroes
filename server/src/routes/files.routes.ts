import {  uploadFiles } from '../controller/files.controller.js'
import { Router } from 'express'
import { upload } from '../middleware/upload.middleware.js'

// import jwtVerify from '../middleware/jwtVerify.middleware.js'

const router = Router()

// router.use(jwtVerify)

router.post('/api/uploads', upload.array("images", 100), uploadFiles)
// router.delete('/api/uploads', deleteHero)

export default router