const express = require('express')
const router = express.Router()

const authRouter = require('./auth.router')
router.use('/auth',authRouter)

const movieRouter = require('./movie.router')
router.use('/movie',movieRouter)

const listRouter = require('./list.router')
router.use('/list',listRouter)

const userRouter = require('./user.router')
router.use('/user',userRouter)

const controlRouter = require('./control.router')
router.use('/control',controlRouter)

const settingRouter = require('./settings.router')
router.use('/settings',settingRouter)

module.exports = router