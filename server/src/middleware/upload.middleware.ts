import multer from 'multer'

export const upload = multer({ dest: 'src/uploads/' })