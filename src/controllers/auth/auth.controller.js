const database = require("./auth.database");
const jwt = require('jsonwebtoken')
const mail = require('../../configs/email')

const verifyAccessToken = (req, res, next) => {
    let accessToken = req.header('authorization').toString().slice(7)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {

        if (err) flagResponseStatus.error403(res)
        else next()
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
                // 
                res.sendStatus(403)
                break
            }
            case 4: {
                res.statusCode = 200
                res.json({
                    accessToken: generateAccessToken(result.data, "1days",process.env.ACCESS_TOKEN_SECRET)
                })
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

        let token = generateAccessToken(payload, '5m',process.env.VERIFY_TOKEN_SECRET)

        let emailContent = `<a href='http://localhost:9999/api/auth/verify-email-token/${token}'>verify</a>`

        mail.sendMail(email,'Verify link', emailContent)

        res.sendStatus(200)

    } catch (err) {
        res.statusCode = 500
        res.json({
            message: err
        })
    }
}

const verifyEmail = (req,res,next) => {
 
        let token = req.params.token
        jwt.verify(token, process.env.VERIFY_TOKEN_SECRET, (err, data) => {

            if (err){
                res.statusCode = 500
                res.json({
                    message: err
                })
            } 

            database.verifyEmail(data.id)
            res.sendStatus(200)
        })
}

module.exports = {
    register: register,
    login: login,
    verifyAccessToken: verifyAccessToken,
    requireLinkVerifyEmail: requireLinkVerifyEmail,
    verifyEmail: verifyEmail
}
