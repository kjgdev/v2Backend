const database = require("./auth.database");
const jwt = require('jsonwebtoken')
const flags = require("../../configs/flags")
const mail = require('../../configs/email')

const verifyAccessToken = (req, res, next) => {
    if (req.header('authorization') == null) {
        let err = { errno: 100, }
        flags.errorResponse(res, err)
        return
    }

    let accessToken = req.header('authorization').toString().slice(7)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {

        if (err) {
            err.errno = 100
            flags.errorResponse(res, err)
        }

        else {
            res.locals.userID = data.id
            next()
        }
    })
}

const generateAccessToken = (payload, time, secret) => jwt.sign(payload, secret, { expiresIn: time })

const register = async (req, res, next) => {
    try {

        let dataBody = req.body
        await database.register(dataBody)

        res.sendStatus(201)

    } catch (error) {
        // dulicate email
        if (error.errno == 1062) {
            res.sendStatus(422)
            return
        }

        res.statusCode = 500
        res.json({
            message: error
        })
    }
}

const login = async (req, res, next) => {
    try {
        let dataBody = req.body
        let result = await database.login(dataBody)

        switch (result.code) {
            case 0: {
                // email not exist
                res.sendStatus(302)
                break
            }
            case 1: {
                // password incorrect
                res.sendStatus(401)
                break
            }
            case 2: {
                // blocked
                res.sendStatus(400)
                break
            }
            case 3: {
                // email not verify
                res.sendStatus(403)
                break
            }
            case 4: {
                let accessToken = generateAccessToken(result.data, "1d", process.env.ACCESS_TOKEN_SECRET)
                await database.insertRefreshToken(result.data.id, accessToken)

                res.statusCode = 200
                res.json({
                    accessToken: accessToken
                })
                break
            }
            case 5:{
                let accessToken = generateAccessToken(result.data, "1d", process.env.ACCESS_TOKEN_SECRET)
                await database.insertRefreshToken(result.data.id, accessToken)

                res.statusCode = 200
                res.json({
                    accessToken: accessToken,
                    first: true
                })
                break;
            }
        }
    } catch (err) {
        res.statusCode = 500
        res.json({
            message: err
        })
    }
}

const requireLinkVerifyEmail = async (req, res, next) => {
    try {

        let email = req.params.email
        let result = await database.checkEmailExist(email)

        if (!result) {
            res.sendStatus(302)
            return
        }

        let payload = {
            id: result.id,
            email: result.email
        }

        let token = generateAccessToken(payload, '5m', process.env.VERIFY_TOKEN_SECRET)

        let emailContent = `<a href='http://localhost:9999/api/auth/verify-email-token/${token}'>verify</a>`

        mail.sendMail(email, 'Verify link', emailContent)

        res.sendStatus(200)

    } catch (err) {
        res.statusCode = 500
        res.json({
            message: err
        })
    }
}

const verifyEmail = (req, res, next) => {

    let token = req.params.token
    jwt.verify(token, process.env.VERIFY_TOKEN_SECRET, (err, data) => {

        if (err) {
            res.statusCode = 500
            res.json({
                message: err
            })
        }

        database.verifyEmail(data.id)
        res.sendStatus(200)
    })
}

const logout = async (req, res, next) => {

    try {
        let token = req.body.token
        let payload = jwt.decode(token)

        await database.logout(payload.id)

        res.sendStatus(200)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const changePass = async (req, res, next) => {
    try {
        
        let data = req.body
        let idUser = res.locals.userID

        await database.changePass(data, idUser)

        res.sendStatus(200)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

module.exports = {
    register: register,
    login: login,
    verifyAccessToken: verifyAccessToken,
    requireLinkVerifyEmail: requireLinkVerifyEmail,
    verifyEmail: verifyEmail,
    logout: logout,
    changePass:changePass
}
