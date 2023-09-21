import fs from 'fs';
const BASE_API = process.env.BASE_API_URL as string

export const urlList = (fileList: Express.Multer.File[]) => {
    const urls = fileList.map((file) => {
        const { originalname, path } = file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)

        return { link: BASE_API + '/' + newPath }
    })
    return urls
}