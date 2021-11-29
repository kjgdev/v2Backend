const database = require("./movie.database")
var _ = require('lodash');

const getAllMovie = async (req, res, next) => {
    try {

        let dataResponse = await database.getAllMovie()

        res.statusCode = 200
        res.json(dataResponse)

    } catch (error) {
        res.statusCode = 500
        res.json({
            message: error
        })
    }
}

const getMovieById = async (req, res, next) => {
    try {

        let id = req.params.id
        let dataResponse = await database.getMovieById(id)

        if (dataResponse == null) {
            res.statusCode = 204
        }
        else
            res.statusCode = 200
        res.json(dataResponse)

    } catch (error) {
        res.statusCode = 500
        res.json({
            message: error
        })
    }
}

const addMovieStart = async (req, res, next) => {
    try {
        let data = {
            idUser: res.locals.userID,
            idMovie: req.params.id_movie
        }
       
        await database.insertMovieStart(data)
        res.sendStatus(200)

    } catch (err) {

        if (err.errno == 1062) {
            res.sendStatus(422)
            return
        }

        res.statusCode = 500
        res.json({
            message: err
        })
    }
}

const getMovieByThreeType =async (req,res,next) => {
    try {
        let results = []

        let types = req.body.arr_id_type
        for(let i = 0; i< types.length;i++){
           results = results.concat(await database.getMovieByType(types[i]))
        }

        let arrLength = req.body.number
        results = _.sampleSize(results,arrLength)

        res.statusCode = 200
        res.json(results)

    } catch (err) {
        res.statusCode = 500
        res.json({
            message: err
        })
    }
}

const deleteMovieStart = async (req, res, next) => {
    try {
        let data = {
            idUser: res.locals.userID,
            idMovie: req.params.id_movie
        }

        await database.deleteMovieStart(data)
        res.sendStatus(200)

    } catch (err) {

        if (err.errno == 1062) {
            res.sendStatus(422)
            return
        }

        res.statusCode = 500
        res.json({
            message: err
        })
    }
}


module.exports = {
    getAllMovie: getAllMovie,
    getMovieById: getMovieById,
    addMovieStart: addMovieStart,
    getMovieByThreeType:getMovieByThreeType,
    deleteMovieStart:deleteMovieStart
}