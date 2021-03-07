import 'dotenv/config';
import multer from 'multer';
import {Request} from 'express';
import path from 'path';
import {MODE} from '../config/baseConfig';

const uploadFolderName = MODE === 'development' ? '../images/dev' : '../images/production';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, uploadFolderName));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
});

const fileFilter = function (req: Request, file: Express.Multer.File, cb: (Error: Error, filename: boolean) => void) {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage, fileFilter});


export default upload;
