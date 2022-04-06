const database = require("./settings.database")
var _ = require('lodash');
const flags = require("../../configs/flags")

const setTimeRunAgain = async (req, res, next) => {
    try {
        let day = req.params.day
        let dataResponse = await database.setTimeRunAgain(day)

        res.statusCode = 200
        res.json(dataResponse)


    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getTimeRunAgain = async (req, res, next) => {
    try {
        let day = req.params.day
        let dataResponse = await database.setTimeRunAgain(day)

        res.statusCode = 200
        res.json(dataResponse)


    } catch (err) {
        flags.errorResponse(res, err)
    }
}


module.exports = {
    setTimeRunAgain
}