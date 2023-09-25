import express, { Request, Response, NextFunction } from 'express';
import errorHandler from './middleware/error.middleware.js';
import connectToBd from './utils/connectToDb.js';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import router from './routes/routes.js';
import logger from './utils/logger.js';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import cors from 'cors'
import path from 'path'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename).slice(0, -4);

const PORT = process.env.PORT || 5050
const BASE_FRONTEND_URL = process.env.BASE_FRONTEND_URL as string

const app = express()

app.use(cors({
    origin: BASE_FRONTEND_URL,
    credentials: true
}))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads/', express.static((__dirname + '/uploads/' )));
app.use(router)
app.use(errorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, 'Page not found'))
})

connectToBd()

app.listen(PORT, () => {
    logger.info(`Server started at http://localhost:${PORT}`)
})
