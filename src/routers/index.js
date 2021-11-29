const express = require('express')
const router = express.Router()

const authRouter = require('./auth.router')
router.use('/auth',authRouter)

const movieRouter = require('./movie.router')
router.use('/movie',movieRouter)


module.exports = router