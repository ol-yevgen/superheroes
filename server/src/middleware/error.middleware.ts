import { Request, Response } from 'express';
import { isHttpError } from 'http-errors';
import logger from '../utils/logger.js';

const errorHandler = (error: unknown, req: Request, res: Response) => {
    let errorMessage = 'Unknown error occurred'
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
    }
    if (error instanceof Error) {
        errorMessage = error.message
        logger.error(error)
    }
    res.status(statusCode).json({ message: errorMessage })
}

export default errorHandler