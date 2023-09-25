import fs from 'fs'
import { __dirname } from '../app.js'
import logger from './logger.js';
import { IImagesLinksList } from '../types/Types.js';

const BASE_API_URL = process.env.BASE_API_URL as string

export const deleteFiles = (urlList: IImagesLinksList[]) => {
    urlList.forEach(item => {
        const imagePath = item.link?.replace(BASE_API_URL, __dirname) as string
        fs.unlink(imagePath, (err) => {
            if (err) {
                logger.info(err)
            } else {
                logger.info(`File ${imagePath.replace(__dirname, '')} has been deleted`)
            }
        })
    })
}