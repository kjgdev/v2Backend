const database = require("./movie.database")
var _ = require('lodash');
const flags = require("../../configs/flags")

const getAllMovie = async (req, res, next) => {
    try {

        let dataResponse = await database.getAllMovie()

        res.statusCode = 200
        res.json(dataResponse)

    } catch (error) {
        flags.errorResponse(res, err)
    }
}

const getMovieById = async (req, res, next) => {
    try {

        let id = req.params.id
        let dataResponse = await database.getMovieById(id)

        if (dataResponse == null) {
            res.statusCode = 204
        }
        else{

            let results = await database.getTypeByMovieId(id)
            dataResponse["type"] = results
            res.statusCode = 200
        }
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

        let idMovies = req.body.arr_id_movie

        for (let i = 0; i < idMovies.length; i++) {
            let data = {
                idUser: res.locals.userID,
                idMovie: idMovies[i]
            }

            await database.insertMovieStart(data)
        }

        res.sendStatus(200)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getMovieSomeType = async (req, res, next) => {
    try {
        let results = []

        let types = req.body.arr_id_type
        for (let i = 0; i < types.length; i++) {
            if (!isNaN(types[i])) {
                results = results.concat(await database.getMovieByType(types[i]))
            }
        }

        let arrLength = req.body.number
        results = _.sampleSize(results, arrLength)

        res.statusCode = 200
        res.json(results)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const addNewMovie = async (req, res, next) => {
    try {

        let data = req.body

        await database.insertMovie(data)

        res.sendStatus(201)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const updateMovie = async (req, res, next) => {
    try {

        let data = req.body
        let idMovie = req.params.id

        await database.updateMovie(data, idMovie)

        res.sendStatus(200)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getType = async (req, res, next) => {
    try {

        let types = await database.getType()
        for (let i = 0; i < types.length; i++) {
            let obj = types[i]
            let count = await database.countMovieOfType(types[i].id)
            obj["movieCount"] = count[0].number
            delete obj.type
            types[i] = obj
        }

        res.statusCode = 200
        res.json(types)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getMovieByType = async (req, res, next) => {
    try {

        let idType = req.params.id

        let result = await database.getMovieByType(idType)

        res.statusCode = 200
        res.json(result)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getMovieByListId = async (req, res, next) => {
    try {

        var results = []

        let movieIds = req.body.arr_id_movie
        console.log(movieIds)
        for (let i = 0; i < movieIds.length; i++) {
                let data = await database.getMovieById(movieIds[i])

                results.push(data)
            
        }

        res.statusCode = 200
        res.json(results)


    } catch (err) {
        flags.errorResponse(res, err)
    }
}

module.exports = {
    getAllMovie: getAllMovie,
    getMovieById: getMovieById,
    addMovieStart: addMovieStart,
    getMovieSomeType: getMovieSomeType,
    addNewMovie: addNewMovie,
    updateMovie: updateMovie,
    getType: getType,
    getMovieByType: getMovieByType,
    getMovieByListId: getMovieByListId
}