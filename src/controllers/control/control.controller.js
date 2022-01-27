const database = require("./control.database")
const flags = require("../../configs/flags")
var _ = require('lodash');

const searchMovie = async (req, res, next) => {
    try {
        
        let data = req.params.content

        let result = await database.searchMovie(data)

        res.sendStatus = 200
        res.json(result)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const statistical = async (req, res, next) => {
    try {
        
        let result = await database.statistical()

        res.statusCode = 200
        res.json(result)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const addMovieView = async (req, res, next) => {
    try {
        let idMovie = req.params.id

        let result = await database.addMovieView(idMovie)

        res.statusCode = 200
        res.json(result)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}


const getTopView = async (req, res, next) => {
    try {

        let result = await database.getTopView()

        res.statusCode = 200
        res.json(result)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const countNewUser = async (req, res, next) => {
    try {

        let fromTime = req.body.from_time
        let toTime = req.body.to_time

        let result = await database.countNewUser(fromTime,toTime)

        res.statusCode = 200
        res.json(result)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

module.exports = {
    searchMovie:searchMovie,
    statistical:statistical,
    addMovieView:addMovieView,
    getTopView:getTopView,
    countNewUser:countNewUser
}