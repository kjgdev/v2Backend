const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/register', controller.authCotroller.register)

router.get('/login', controller.authCotroller.login)

router.get('/verify-email/:email', controller.authCotroller.requireLinkVerifyEmail)

router.get('/verify-email-token/:token', controller.authCotroller.verifyEmail)



module.exports = router