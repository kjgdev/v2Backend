const database = require("./user.database")
const flags = require("../../configs/flags")
var _ = require('lodash');

const addMovieToFavList = async (req, res, next) => {
    try {

        let idMovie = req.params.id_movie
        let idUser = res.locals.userID

        await database.addMovieToFavList(idMovie, idUser)

        res.sendStatus(201)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const deleteMovieToFavList = async (req, res, next) => {
    try {
        
        let idMovie = req.params.id_movie
        let idUser = res.locals.userID

        await database.deleteMovieToFavList(idMovie, idUser)

        res.sendStatus(200)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getFavList = async (req, res, next) => {
    try {
        
        let idUser = res.locals.userID

        let result = await database.getFavList(idUser)

        res.statusCode = 200
        res.json(result)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

module.exports = {
    addMovieToFavList: addMovieToFavList,
    deleteMovieToFavList:deleteMovieToFavList,
    getFavList:getFavList
}