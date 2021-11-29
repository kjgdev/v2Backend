const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/movie-start',controller.authCotroller.verifyAccessToken, controller.movieRouter.addMovieStart)

// router.delete('/movie-start/:id_movie',controller.authCotroller.verifyAccessToken, controller.movieRouter.deleteMovieStart)

router.get('/movie-start-type',controller.authCotroller.verifyAccessToken, controller.movieRouter.getMovieByThreeType)

router.get('/:id', controller.movieRouter.getMovieById)

router.get('/', controller.movieRouter.getAllMovie)


module.exports = router