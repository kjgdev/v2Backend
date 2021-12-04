const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/', controller.authCotroller.verifyAccessToken, controller.listController.addList)

router.get('/all-list', controller.authCotroller.verifyAccessToken, controller.listController.getAllList)

router.get('/all-type', controller.authCotroller.verifyAccessToken, controller.listController.getAllType)

router.post('/add-movie-to-list',controller.authCotroller.verifyAccessToken, controller.listController.addMovieToList)

module.exports = router