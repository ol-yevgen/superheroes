import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger.js'
import fs from 'fs'
// import { __dirname } from '../app.js'

const BASE_API = process.env.BASE_API_URL as string

export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const fileList = req.files as Express.Multer.File[]
        // res.json({ url: `uploads/${req.file?.filename}`, message: `Files have been upload` })

        // Save image metadata to MongoDB
        // const savedImages = await Promise.all(
        //     imageUrls.map(async (url: string) => {
        //         const image = new ImageModel({ filename: path.basename(url), url });
        //         return await image.save();
        //     })
        // );


        const urlList = fileList.map((file) => {
            const { originalname, path } = file
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = path + '.' + ext
            fs.renameSync(path, newPath)

            return { link: BASE_API + '/' + newPath }
        })


        res.json(urlList);
        logger.info('File has been upload')
    } catch (error) {
        console.error("Error saving images:", error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error)
    }
}
