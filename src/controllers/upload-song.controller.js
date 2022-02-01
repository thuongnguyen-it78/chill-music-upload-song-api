import { OK } from '../constants/httpStatusCode.constant'
import { singleResponse } from '../constants/response.constant'
import UploadSongService from '../services/upload-song.service'

class ImageController {
  async uploadSong(req, res, next) {
    try {
      const data = await UploadSongService.uploadSong(req)
      return res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }
}

export default new ImageController()
