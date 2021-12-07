const jwt = require('jsonwebtoken')
const pool = require('@configs/database');
const bcrypt = require('bcryptjs')

const bcryptHash = async (pass) => {
    return await bcrypt.hash(pass.toString(), 10)
}

const comparePassword = (pass, hashPass) => {
    return bcrypt.compareSync(pass.toString(), hashPass);
}

const register = async (data) => {
    let hashPass = await bcryptHash(data.password)
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
        pool.query(query, [data.email], async (err, results) => {

            if (err) return reject(err)

            // email not exist
            if (results.length == 0) {
                resultData.code = 0
                return reslove(resultData)
            }

            let userInfo = results[0]

            // locked account
            if (!userInfo.is_active) {
                resultData.code = 2
                return reslove(resultData)
            }

            // account not confirm email
            if (!userInfo.is_confirm_email) {
                resultData.code = 3
                return reslove(resultData)
            }

            if (userInfo.is_online == 1) {
                await logout(userInfo.id)

                // thong bao logout
            }

            let hashPass = userInfo.password
            let pass = data.password

            if (!comparePassword(pass, hashPass)) {
                resultData.code = 1
            }
            else {
                if (userInfo.is_first != 1) {
                    resultData.code = 5
                }
                else resultData.code = 4

                resultData.data = {
                    id: userInfo.id,
                    email: userInfo.email
                }
            }

            reslove(resultData)
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

const insertRefreshToken = (idUser, token) => {
    let query = `INSERT INTO auth_token(id_user, token) VALUES(?,?)`

    return new Promise((reslove, reject) => {
        pool.query(query, [idUser, token], async (err, results) => {
            if (err) reject(err)

            await updateStatusOnline(idUser, 1)
            reslove()
        })
    })
}

const updateStatusOnline = (idUser, value) => {
    let query = `UPDATE user SET is_online = ? WHERE id = ?`

    return new Promise((reslove, reject) => {
        pool.query(query, [value, idUser], (err, results) => {
            if (err) reject(err)

            reslove()
        })
    })
}

const checkRefreshToken = (token) => {
    var query = "SELECT * FROM auth_token WHERE id_user=?"

    return new Promise((reslove, reject) => {
        pool.query(query, [token], (err, results) => {
            if (err) {
                reject(err)
            }
            if (results.length > 0) reslove(true)
            reslove(false)
        })

    })
}

const logout = (idUser) => {
    return new Promise((reslove, reject) => {
        var query = "DELETE FROM auth_token WHERE id_user=?"

        pool.query(query, [idUser], async (err, results) => {
            if (err) {
                reject(err)
            }

            await updateStatusOnline(idUser, 0)
            reslove()
        })
    })
}

const changePass = (data, idUser,email) => {
    return new Promise(async (reslove, reject) => {

        let query1 = `SELECT * FROM user WHERE email= ?`
        pool.query(query1, [email], async (err, results) => {
            if (err || results.length === 0) {
                reject(err)
            }

            let pass = results[0].password
            let oldPassword = data.oldPassword

            if (!comparePassword(oldPassword, pass)) {
                reject(404)
            }

            let hashPass = await bcryptHash(data.newPassword)

            var query = "UPDATE user SET password = ? WHERE id = ? "
    
            pool.query(query, [hashPass, idUser], async (err, results) => {
                if (err) {
                    reject(err)
                }
    
                await updateStatusOnline(idUser, 0)
                reslove()
            })
        })

    
    })
}

module.exports = {
    register: register,
    login: login,
    checkEmailExist: checkEmailExist,
    verifyEmail: verifyEmail,
    insertRefreshToken: insertRefreshToken,
    logout: logout,
    changePass: changePass
}

