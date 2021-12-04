const database = require("./list.database")
var _ = require('lodash');
const flags = require("../../configs/flags")


const addList = async (req, res, next) => {
    try {

        let data = req.body

        await database.insertList(data)

        res.sendStatus(201)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getAllList = async (req, res, next) => {
    try {

        let results = await database.getAllList()

        res.statusCode = 200
        res.json(results)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getAllType = async (req, res, next) => {
    try {

        let results = await database.getAllType()

        res.statusCode = 200
        res.json(results)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const addMovieToList = async (req, res, next) => {
    try {

        let data=  req.body

        await database.insertMovieToList(data)

        res.sendStatus(200)

    } catch (error) {
        flags.errorResponse(res, error)
    }
}


module.exports = {
    addList: addList,
    getAllList: getAllList,
    getAllType: getAllType,
    addMovieToList:addMovieToList
}
