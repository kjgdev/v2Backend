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

const insertMovie  = (data) => {
    return new Promise((reslove, reject) => {
        let name = data.name || ""
        let uri_trailer = data.uri_trailer || ""
        let description = data.description || ""
        let uri_thumbnail = data.uri_thumbnail || ""
        let uri_avatar = data.uri_avatar || ""
        let age_tag = data.age_tag || 0
        let premiere_time = data.premiere_time || "2020-12-31"
        let status = data.status || 0
        let movie_duration = data.movie_duration || 0
        let uri_movie = data.uri_movie || ""
        let director = data.director || ""
        let actor = data.actor || ""

        const query = `INSERT INTO movie(name, uri_trailer, description, uri_thumbnail, uri_avatar, age_tag, premiere_time, movie_duration, uri_movie,status, director,actor)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`

        pool.query(query, [name, uri_trailer, description, uri_thumbnail, uri_avatar, age_tag, premiere_time, movie_duration, uri_movie,status, director, actor], (err, results) => {

            if (err) {
                return reject(err)
            }
            else return reslove()
        })
    })
}

const updateMovie = (data, id) => {
    return new Promise((reslove, reject) => {
        let name = data.name
        let uri_trailer = data.uri_trailer
        let description = data.description
        let uri_thumbnail = data.uri_thumbnail
        let uri_avatar = data.uri_avatar
        let age_tag = data.age_tag
        let premiere_time = data.premiere_time
        let status = data.status
        let movie_duration = data.movie_duration
        let uri_movie = data.uri_movie || ""

        const query = `UPDATE movie 
        SET name = ?, uri_trailer = ?, description = ?, uri_thumbnail = ?, uri_avatar = ?, age_tag = ?, premiere_time = ?,  movie_duration = ?, uri_movie = ?, status = ?
        WHERE id = ?`

        pool.query(query, [name, uri_trailer, description, uri_thumbnail, uri_avatar, age_tag, premiere_time, movie_duration, uri_movie, status,id], (err, results) => {
            if (err) {
                return reject(err)
            }
            else return reslove()
        })
    })
}

module.exports = {
    getAllMovie: getAllMovie,
    getMovieById:getMovieById,
    insertMovieStart:insertMovieStart,
    getMovieByType:getMovieByType,
    deleteMovieStart:deleteMovieStart,
    insertMovie:insertMovie,
    updateMovie:updateMovie,
}