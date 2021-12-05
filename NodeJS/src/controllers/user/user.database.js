const pool = require('@configs/database');

const addMovieToFavList = (idMovie, idUser) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO favourite_list(id_user, id_movie)
        VALUES(?,?)`

        pool.query(query,[idUser, idMovie] ,(err, result) => {
            if (err) {
                reject(err);
            }

            resolve()
        })
    })
}

const deleteMovieToFavList = (idMovie, idUser) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM favourite_list WHERE id_user = ? AND id_movie = ?`

        pool.query(query,[idUser, idMovie] ,(err, result) => {
            if (err) {
                reject(err)
            }

            resolve()
        })
    })
}

const getFavList = (idUser) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT m.* FROM movie AS m, favourite_list AS f WHERE f.id_user = ? AND m.id = f.id_movie`

        pool.query(query,[idUser] ,(err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result)
        })
    })
}



module.exports = {
    addMovieToFavList:addMovieToFavList,
    deleteMovieToFavList:deleteMovieToFavList,
    getFavList:getFavList
}