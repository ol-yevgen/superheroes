import multer from 'multer'

// export const upload = multer({ dest: './uploads' })
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

export const upload = multer({ storage: fileStorageEngine });