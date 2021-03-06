import express from 'express'
import upload from './../middlewares/multer'
import {postImage, getImages, getImageById, deleteImageById, updateImageById} from './../controllers/Image.controller'

const router = express.Router()

router.get('/', getImages)

router.get('/:id', getImageById)

router.post('/', upload.single('image'), postImage);

router.patch('/:id', upload.single('image'),updateImageById )

router.delete('/:id', deleteImageById)

export default router