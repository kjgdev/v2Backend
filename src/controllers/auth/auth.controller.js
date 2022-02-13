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
            res.locals.email = data.email
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
        console.log(req.rawHeaders[4])
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
                    accessToken: accessToken,
                    id: result.data.id,
                    first: false
                })
                break
            }
            case 5:{
                let accessToken = generateAccessToken(result.data, "1d", process.env.ACCESS_TOKEN_SECRET)
                await database.insertRefreshToken(result.data.id, accessToken)

                res.statusCode = 200
                res.json({
                    accessToken: accessToken,
                    id: result.data.id,
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

        let emailContent = `<a href='http://139.180.187.185:1111/api/auth/verify-email-token/${token}'>verify</a>`

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

const forgotPass = async (req, res, next) => {
    try {

        let email = req.params.email
        let result = await database.checkEmailExist(email)

        if (!result) {
            res.sendStatus(302)
            return
        }

        let pass = randomPass(12)

        await database.updatePass(pass,result.id)
        
        let emailContent = `New pass: \n ${pass}`

        mail.sendMail(email, 'Reset pass', emailContent)

        res.sendStatus(200)

    } catch (err) {
        res.statusCode = 500
        res.json({
            message: err
        })
    }
}

const randomPass = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
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
        let email = res.locals.email

        await database.changePass(data, idUser, email)

        res.sendStatus(200)

    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const getProfile = async (req, res, next) => {
    try {

        let idUser = res.locals.userID

        let result = await database.getProfile(idUser)

        res.statusCode = 200
        res.json(result)
        
    } catch (err) {
        flags.errorResponse(res, err)
    }
}

const updateProfile = async (req, res, next) => {
    try {

        let data = req.body
        let idUser = res.locals.userID

        await database.updateProfile(data,idUser)

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
    changePass:changePass,
    forgotPass:forgotPass,
    getProfile:getProfile,
    updateProfile:updateProfile
}
