const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/register', controller.authCotroller.register)

router.post('/login', controller.authCotroller.login)

router.get('/verify-email/:email', controller.authCotroller.requireLinkVerifyEmail)

router.get('/verify-email-token/:token', controller.authCotroller.verifyEmail)

router.get('/forgot-pass/:email', controller.authCotroller.forgotPass)

router.get('/profile', controller.authCotroller.verifyAccessToken, controller.authCotroller.getProfile)

router.put('/profile', controller.authCotroller.verifyAccessToken, controller.authCotroller.updateProfile)

router.put('/change-pass', controller.authCotroller.verifyAccessToken, controller.authCotroller.changePass)

router.delete('/logout', controller.authCotroller.logout)

module.exports = router