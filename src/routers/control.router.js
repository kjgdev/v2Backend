const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.get('/search/:content', controller.authCotroller.verifyAccessToken, controller.controlController.searchMovie)

router.get('/statistical', controller.authCotroller.verifyAccessToken, controller.controlController.statistical)

module.exports = router