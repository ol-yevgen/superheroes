import fs from 'fs'
import { __dirname } from '../app.js'
import logger from './logger.js';
import { IImagesLinksList } from '../types/Types.js';

export const deleteFiles = (urlList: IImagesLinksList[]) => {
    urlList.forEach(item => {
        const imagePath = item.link?.replace('http://localhost:4000/', __dirname) as string
        fs.unlink(imagePath, (err) => {
            if (err) {
                logger.info(err)
            } else {
                logger.info(`File ${imagePath.replace(__dirname, '')} has been deleted`)
            }
        })
    })
}