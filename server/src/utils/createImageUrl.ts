const BASE_API = process.env.BASE_API_URL as string

export const urlList = (fileList: Express.Multer.File[]) => {
    const urls = fileList.map((file) => {
        const { path } = file
        const newPath = '/' + path

        return { link: BASE_API + newPath }
    })
    return urls
}