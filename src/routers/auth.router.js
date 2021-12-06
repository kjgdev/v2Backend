const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/register', controller.authCotroller.register)

router.post('/login', controller.authCotroller.login)

router.get('/verify-email/:email', controller.authCotroller.requireLinkVerifyEmail)

router.get('/verify-email-token/:token', controller.authCotroller.verifyEmail)

router.put('/change-pass', controller.authCotroller.verifyAccessToken, controller.authCotroller.changePass)

router.delete('/logout', controller.authCotroller.logout)

module.exports = router