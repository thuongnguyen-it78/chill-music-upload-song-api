import createError from 'http-errors'
import { UNAUTHORIZED } from '../constants/httpStatusCode.constant'
import { verifyAccessToken } from '../utils/auth'

class AuthMiddleware {
  async verifyUser(req, res, next) {
    next()
  }

  async verifyPermission(req, res, next) {
    const user = req.user
    try {
      if (user.role < 1) {
        throw createError.Forbidden('Forbidden')
      }
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthMiddleware()
