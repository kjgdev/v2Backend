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

        var query2 = "UPDATE user SET is_first = 1 WHERE id = ?"

        pool.query(query, [data.idUser, data.idMovie], async (err, results) => {
            if (err) {
                reject(err)
            }
            pool.query(query2, [data.idUser], (err, results) => { })
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

const insertMovie = (data) => {
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

        pool.query(query, [name, uri_trailer, description, uri_thumbnail, uri_avatar, age_tag, premiere_time, movie_duration, uri_movie, status, director, actor], (err, results) => {

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

        pool.query(query, [name, uri_trailer, description, uri_thumbnail, uri_avatar, age_tag, premiere_time, movie_duration, uri_movie, status, id], (err, results) => {
            if (err) {
                return reject(err)
            }
            else return reslove()
        })
    })
}

const countMovieOfType = (idType) => {
    return new Promise((reslove, reject) => {

        var query = `SELECT count(mv.id) AS 'number' FROM movie AS mv, movie_list AS t WHERE t.id_list = ? AND t.id_movie = mv.id `

        pool.query(query, [idType], (err, results) => {
            if (err) {
                return reject(err)
            }
            else return reslove(results)
        })
    })
}

const getType = () => {
    return new Promise((reslove, reject) => {
        var query = `SELECT * FROM list WHERE type = 0`

        pool.query(query, (err, results) => {
            if (err) {
                return reject(err)
            }

            else return reslove(results)
        })
    })
}

const getTypeByMovieId = (movieId) => {
    return new Promise((reslove, reject) => {
        var query = `SELECT l.* FROM list AS l, movie AS m, movie_list AS ml WHERE m.id = ? AND m.id = ml.id_movie AND ml.id_list = l.id`

        pool.query(query, [movieId], (err, results) => {
            if (err) {
                return reject(err)
            }

            else return reslove(results)
        })
    })
}

const addTimeWatcher = (idUser, movieId, value) => {
    return new Promise((reslove, reject) => {
        var query = `SELECT * FROM interactive WHERE id_user = ? AND id_movie = ?`
        pool.query(query, [idUser, movieId],(err, results) => {
            if (results.length == 0) {
                var query1 = `INSERT INTO interactive (id_user, id_movie, time_watched) VALUES(?,?,?)`
                pool.query(query1, [idUser, movieId, value], (err, results) => {
                    if (err) {
                        return reject(err)
                    }
                    reslove()
                })
            }
            else{
                var query1 = `UPDATE interactive SET time_watched = ?  WHERE id_user = ? AND id_movie = ?`
                pool.query(query1, [value,idUser, movieId ], (err, results) => {
                    if (err) {
                        return reject(err)
                    }
                    reslove()
                })
            }
         
        })
    })
}

const addClicked = (idUser, movieId, value) => {
    return new Promise((reslove, reject) => {
        var query = `SELECT * FROM interactive WHERE id_user = ? AND id_movie = ?`
        pool.query(query, [idUser, movieId],(err, results) => {
            if (results.length == 0) {
                var query1 = `INSERT INTO interactive (id_user, id_movie, is_clicked) VALUES(?,?,?)`
                pool.query(query1, [idUser, movieId, value], (err, results) => {
                    if (err) {
                        return reject(err)
                    }
                    reslove()
                })
            }
            else{
                var query1 = `UPDATE interactive SET is_clicked = ?  WHERE id_user = ? AND id_movie = ?`
                pool.query(query1, [value,idUser, movieId ], (err, results) => {
                    if (err) {
                        return reject(err)
                    }
                    reslove()
                })
            }
         
        })
    })
}

const addUserTimeWatched = (idUser, movieId, value) => {
    return new Promise((reslove, reject) => {
        var query = `SELECT * FROM watching_list WHERE id_user = ? AND id_movie = ?`
        pool.query(query, [idUser, movieId],(err, results) => {
            if (results.length == 0) {
                var query1 = `INSERT INTO watching_list (id_user, id_movie, current_duration) VALUES(?,?,?)`
                pool.query(query1, [idUser, movieId, value], (err, results) => {
                    if (err) {
                        return reject(err)
                    }
                    reslove()
                })
            }
            else{
                var query1 = `UPDATE watching_list SET current_duration = ?  WHERE id_user = ? AND id_movie = ?`
                pool.query(query1, [value,idUser, movieId ], (err, results) => {
                    if (err) {
                        return reject(err)
                    }
                    reslove()
                })
            }
        })
    })
}


const getWatchingList = (idUser) => {
    return new Promise((reslove, reject) => {

        const query = `SELECT mv.*, t.current_duration FROM movie AS mv, watching_list AS t WHERE t.id_user = ? AND t.id_movie = mv.id `

        pool.query(query, [idUser], (err, results) => {
            
            if (err) {
                reject(err)
            }
            else reslove(results)
        })
    })
}

module.exports = {
    getAllMovie: getAllMovie,
    getMovieById: getMovieById,
    insertMovieStart: insertMovieStart,
    getMovieByType: getMovieByType,
    deleteMovieStart: deleteMovieStart,
    insertMovie: insertMovie,
    updateMovie: updateMovie,
    getType: getType,
    countMovieOfType: countMovieOfType,
    getTypeByMovieId: getTypeByMovieId,
    addTimeWatcher: addTimeWatcher,
    addClicked:addClicked,
    addUserTimeWatched:addUserTimeWatched,
    getWatchingList:getWatchingList
}