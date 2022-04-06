const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.post('/time-run-again/:day',  controller.settingController.setTimeRunAgain)

module.exports = router