const pool = require('@configs/database');

const insertList = (data) => {
    return new Promise((reslove, reject) => {
        var query = "INSERT INTO list(name, type) VALUES(?,?)"

        pool.query(query, [data.name, data.type], async (err, results) => {
            if (err) {
                reject(err)
            }

            reslove()
        })
    })
}

const getAllList = () => {
    return new Promise((reslove, reject) => {
        var query = "SELECT * FROM list WHERE type = 1"

        pool.query(query, [], async (err, results) => {
            if (err) {
                reject(err)
            }

            reslove(results)
        })
    })
}

const getAllType = () => {
    return new Promise((reslove, reject) => {
        var query = "SELECT * FROM list WHERE type = 0"

        pool.query(query, [], async (err, results) => {
            if (err) {
                reject(err)
            }

            reslove(results)
        })
    })
}

const insertMovieToList = (data) => {
    return new Promise((reslove, reject) => {

        let idList = data.id_list
        let idMovie = data.id_movie

        const query = `INSERT INTO movie_list(id_list, id_movie)
        VALUES(?,?)`

        pool.query(query, [idList, idMovie], (err, results) => {
            if (err) {
                return reject(err)
            }
            else return reslove()
        })
    })
}

module.exports = {
    insertList: insertList,
    getAllList: getAllList,
    getAllType: getAllType,
    insertMovieToList:insertMovieToList
}