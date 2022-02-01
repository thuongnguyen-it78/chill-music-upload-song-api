import express from 'express'
import UploadSongController from '../controllers/upload-song.controller'
import fileUploader from '../configs/cloudinary.config'
const router = express.Router()

router.post('/', fileUploader.single('song'), UploadSongController.uploadSong)

export default router
