const jwt = require('jsonwebtoken')
const pool = require('@configs/database');
const bcrypt = require('bcrypt')

const bcryptHash = async (pass) => {
    return await bcrypt.hash(pass, 10)
}

const comparePassword = (pass, hashPass) => {
    return bcrypt.compareSync(pass, hashPass);
}

const register = async (data) => {
    let hashPass = bcryptHash(data.password)
    let userInfo = {
        email: data.email,
        password: hashPass,
        gender: data.gender,
        dob: data.dob,
        role: data.role || 1,
        country: data.country
    }

    let query = `INSERT INTO user(email, password, gender, dob, role, country) VALUES(?,?,?,?,?,?)`

    return new Promise((reslove, reject) => {
        pool.query(query, [userInfo.email, userInfo.password, userInfo.gender, userInfo.dob, userInfo.role, userInfo.country], (err, results) => {
            if (err) return reject(err)

            return reslove()
        })
    })
}



const login = async (data) => {
    let query = `SELECT * FROM user WHERE email= ?`

    let resultData = {
        code: 0,
        data: []
    }

    return new Promise((reslove, reject) => {
        pool.query(query, [data.email], (err, results) => {

            if (err) return reject(err)

            // email not exist
            if (results.length == 0) resultData.code = 0

            let userInfo = results[0]

            // locked account
            if (!userInfo.is_active) resultData.code = 2

            // account not confirm email
            if (!userInfo.is_confirm_email) resultData.code = 3

            let hashPass = userInfo.password
            let pass = data.password

            if (!comparePassword(pass, hashPass)) resultData.code = 1
            else {
                resultData.code = 4
                resultData.data = {
                    id: userInfo.id,
                    email: userInfo.email
                }
            }

            return reslove(resultData)
        })
    })
}

const checkEmailExist = (email) => {
    let query = `SELECT * FROM user WHERE email= ?`

    return new Promise((reslove, reject) => {
        pool.query(query, [email], (err, results) => {
            if (err) return reject(err)

            if (results.length == 0) return reslove(false)
            return reslove(results[0])
        })
    })
}

const verifyEmail = (id) => {
    let query = `UPDATE user SET is_confirm_email = 1 WHERE id = ?`

    return new Promise((reslove, reject) => {
        pool.query(query, [id], (err, results) => {
            if (err) return reject(err)

            return reslove()
        })
    })
}

module.exports = {
    register: register,
    login: login,
    checkEmailExist: checkEmailExist,
    verifyEmail:verifyEmail
}

