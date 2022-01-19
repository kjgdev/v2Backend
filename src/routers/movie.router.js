const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/movie-start',controller.authCotroller.verifyAccessToken, controller.movieController.addMovieStart)

router.post('/movie-some-type',controller.authCotroller.verifyAccessToken, controller.movieController.getMovieSomeType)

router.post('/some-movie', controller.movieController.getMovieByListId)

router.get('/type/:id', controller.authCotroller.verifyAccessToken, controller.movieController.getMovieByType)

router.get('/type', controller.authCotroller.verifyAccessToken, controller.movieController.getType)

router.post('/', controller.authCotroller.verifyAccessToken, controller.movieController.addNewMovie)

router.get('/:id',controller.authCotroller.verifyAccessToken, controller.movieController.getMovieById)

router.put('/:id',controller.authCotroller.verifyAccessToken, controller.movieController.updateMovie)

router.get('/',controller.authCotroller.verifyAccessToken, controller.movieController.getAllMovie)

router.post('/add-time-watcher', controller.authCotroller.verifyAccessToken, controller.movieController.addTimeWatcher)

router.post('/is-clicked', controller.authCotroller.verifyAccessToken, controller.movieController.addClicked)

module.exports = router