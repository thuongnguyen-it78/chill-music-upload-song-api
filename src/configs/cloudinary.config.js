import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import {
  CLOUDINARY_NAME,
  CLOUDINARY_PUBLIC_KEY,
  CLOUDINARY_SECRET_KEY,
} from '../constants/cloudinary.constant'

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_PUBLIC_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
})

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['mp3'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  params: async (req, file) => {
    const folderName = 'songs'
    const resourceType = 'video'

    return {
      folder: folderName,
      resource_type: resourceType,
    }
  },
})

const uploadCloud = multer({ storage })

export default uploadCloud
