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

const addCountDevice = async (req, res, next) => {
    try {

        let type = req.params.type

       await database.addCountDevice(type)

        res.sendStatus(200)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getCountDevice = async (req, res, next) => {
    try {

        let type = req.params.type

        let result = await database.getCountDevice(type)

        res.statusCode = 200
        res.json(
            {
                lable:['mobile', 'tablet', 'desktop'],
                value:[result.mobile,result.tablet, result.desktop]
            }
        )

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const countNewUserNow = async (req, res, next) => {
    try {

        let nowTime = new Date()

        let monthNow = nowTime.getMonth() + 1

        let yearNow = nowTime.getFullYear()
        
        let lastyear = monthNow == 1 ? yearNow - 1: yearNow
        
        let middleTime = new Date(yearNow,monthNow-1,2)

        let lastMonth = monthNow == 1 ? 12 : monthNow - 1

        let lastTime = new Date(lastyear, lastMonth-1,2)

        let resultNow = await database.countNewUser(middleTime,nowTime)
        let resultLast = await database.countNewUser(lastTime,middleTime)

        let per =  (resultNow.new_user - resultLast.new_user) / 100

        let resultData = {
            new_user : resultNow.new_user,
            per: per
        }

        res.statusCode = 200

        res.json(resultData)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}


const countViewNow = async (req, res, next) => {
    try {

        let nowTime = new Date()

        let monthNow = nowTime.getMonth() + 1

        let yearNow = nowTime.getFullYear()
        
        let lastyear = monthNow == 1 ? yearNow - 1: yearNow
        
        let middleTime = new Date(yearNow,monthNow-1,2)

        let lastMonth = monthNow == 1 ? 12 : monthNow - 1

        let lastTime = new Date(lastyear, lastMonth-1,2)

        let resultNow = await database.countViewNow(middleTime,nowTime)
        let resultLast = await database.countViewNow(lastTime,middleTime)

        let per =  (resultNow.view - resultLast.view) / 100

        let resultData = {
            view_count : resultNow.view,
            per: per
        }

        res.statusCode = 200

        res.json(resultData)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

module.exports = {
    searchMovie:searchMovie,
    statistical:statistical,
    addMovieView:addMovieView,
    getTopView:getTopView,
    countNewUser:countNewUser,
    countNewUserNow:countNewUserNow,
    addCountDevice:addCountDevice,
    getCountDevice:getCountDevice,
    countViewNow:countViewNow
}