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

module.exports = {
    searchMovie:searchMovie,
    statistical:statistical
}