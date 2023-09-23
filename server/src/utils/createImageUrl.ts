import fs from 'fs';
// import logger from './logger.js';

const BASE_API = process.env.BASE_API_URL as string

export const urlList = (fileList: Express.Multer.File[]) => {
    const urls = fileList.map((file) => {
        const { path } = file
        fs.renameSync(path, path)
        // const { originalname, path } = file
        // const parts = originalname.split('.')
        // const ext = parts[parts.length - 1]
        // const newPath = path + '.' + ext
        // logger.info(newPath)

        return { link: BASE_API + '/' + path }
    })
    return urls
}