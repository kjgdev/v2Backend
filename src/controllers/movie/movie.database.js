const pool = require('@configs/database');

const getAllMovie = () => {
    let query = `SELECT * FROM movie`

    return new Promise((reslove, reject) => {
        pool.query(query, (err, results) => {
            if (err) reject(err)

            reslove(results)
        })
    })
}

const getMovieById = (id) => {
    let query = `SELECT * FROM movie WHERE id=?`

    return new Promise((reslove, reject) => {
        pool.query(query, [id], (err, results) => {
            if (err) reject(err)

            reslove(results[0])
        })
    })
}


const insertMovieStart = (data) => {
    return new Promise((reslove, reject) => {
        var query = "INSERT INTO movie_start(id_user, id_movie) VALUES(?,?)"

        pool.query(query, [data.idUser, data.idMovie], async (err, results) => {
            if (err) {
                reject(err)
            }

            reslove()
        })
    })
}

const deleteMovieStart = (data) => {
    return new Promise((reslove, reject) => {
        var query = "DELETE FROM movie_start WHERE id_movie = ? AND id_user = ?"

        pool.query(query, [data.idMovie, data.idUser], async (err, results) => {
            if (err) {
                reject(err)
            }

            reslove()
        })
    })
}

const getMovieByType = (idType) => {
    return new Promise((reslove, reject) => {

        const query = `SELECT mv.* FROM movie AS mv, movie_list AS t WHERE t.id_list = ? AND t.id_movie = mv.id `

        pool.query(query, [idType], (err, results) => {
            if (err) {
                reject(err)
            }
            else reslove(results)
        })
    })
}

module.exports = {
    getAllMovie: getAllMovie,
    getMovieById:getMovieById,
    insertMovieStart:insertMovieStart,
    getMovieByType:getMovieByType,
    deleteMovieStart:deleteMovieStart
}