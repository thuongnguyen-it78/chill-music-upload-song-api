process.env.NODE_ENV === 'production' || require('dotenv').config()

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { PORT } from './constants/auth.constant.js'
import { NOT_FOUND } from './constants/httpStatusCode.constant.js'
import { failedResponse } from './constants/response.constant.js'
import AuthMiddleware from './middlewares/auth.middleware'
import route from './routes/index.route.js'
import { accessLogStream } from './utils/helper'

const app = express()

// configure
const isProduction = process.env.NODE_ENV === 'production'

// enabling CORS for all requests
app.use(cors())

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json())

// adding Helmet to enhance your API's security
app.use(helmet())
app.use(express.urlencoded({ extended: true }))

// logger
if (!isProduction) app.use(morgan('combined', { stream: accessLogStream }))
else app.use(morgan('dev'))

// verify user
app.use(AuthMiddleware.verifyUser)

// route
route(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = NOT_FOUND
  next(err)
})

// handle error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    ...failedResponse,
    message: err.message,
  })
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

// unit test: don't need database
// integration test: need database
