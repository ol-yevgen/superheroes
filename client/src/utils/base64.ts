// export const convertToBase64 = (files: File[]) => {
//     const base64ImagesList = files.map(file => {
//         return new Promise((resolve, reject) => {
//             const fileReader = new FileReader();
//             fileReader.readAsDataURL(file);
//             fileReader.onload = () => {
//                 resolve(fileReader.result)
//             };
//             fileReader.onerror = (error) => {
//                 reject(error)
//             }
//         })
//     })

//     return base64ImagesList
// }
interface IImage {
    image: unknown
}

export const convertToBase64 = async (files: File[]) => {
    const promisesImagesList = files.map(file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    })
    const b: IImage[] = [] 
    const a = await Promise.all(promisesImagesList)
    a.map(image => {
        return b.push({image: image})
    })
    return b
}