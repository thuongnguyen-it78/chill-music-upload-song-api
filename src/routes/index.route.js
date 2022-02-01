import uploadSongRoute from './upload-song.route'

function route(app) {
  app.use('/v1/upload-song', uploadSongRoute)
}

export default route
