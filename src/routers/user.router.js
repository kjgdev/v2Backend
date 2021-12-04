const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.get('/favourite-list/', controller.authCotroller.verifyAccessToken, controller.userController.getFavList)

router.post('/favourite-list/:id_movie', controller.authCotroller.verifyAccessToken, controller.userController.addMovieToFavList)

router.delete('/favourite-list/:id_movie', controller.authCotroller.verifyAccessToken, controller.userController.deleteMovieToFavList)

module.exports = router