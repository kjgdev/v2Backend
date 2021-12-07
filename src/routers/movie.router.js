const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/movie-start',controller.authCotroller.verifyAccessToken, controller.movieController.addMovieStart)

router.get('/movie-some-type/:arr_id_type&:number',controller.authCotroller.verifyAccessToken, controller.movieController.getMovieSomeType)

router.get('/type/:id', controller.authCotroller.verifyAccessToken, controller.movieController.getMovieByType)

router.get('/type', controller.authCotroller.verifyAccessToken, controller.movieController.getType)

router.post('/', controller.authCotroller.verifyAccessToken, controller.movieController.addNewMovie)

router.get('/:id',controller.authCotroller.verifyAccessToken, controller.movieController.getMovieById)

router.put('/:id',controller.authCotroller.verifyAccessToken, controller.movieController.updateMovie)

router.get('/',controller.authCotroller.verifyAccessToken, controller.movieController.getAllMovie)

module.exports = router