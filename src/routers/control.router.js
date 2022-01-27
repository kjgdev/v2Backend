const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.get('/search/:content', controller.authCotroller.verifyAccessToken, controller.controlController.searchMovie)

router.get('/statistical', controller.authCotroller.verifyAccessToken, controller.controlController.statistical)

router.post('/add-view-count/:id', controller.authCotroller.verifyAccessToken, controller.controlController.addMovieView)

router.get('/get-top-view/', controller.authCotroller.verifyAccessToken, controller.controlController.getTopView)

router.get('/count-new-user/', controller.authCotroller.verifyAccessToken, controller.controlController.countNewUser)


module.exports = router