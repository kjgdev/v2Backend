const pool = require('@configs/database');

const searchMovie = (data) => {
    return new Promise((reslove, reject) => {
        let arrResult = []
        const query = `SELECT * FROM movie WHERE MATCH (name)
            AGAINST (? IN NATURAL LANGUAGE MODE);`

        pool.query(query, [data], (err, results) => {

            if (err) {
                reject(err)
            }

            else {
                for (let i = 0; i < results.length; i++) {
                    arrResult.push(results[i])
                }

                const query1 = `SELECT * FROM movie ORDER BY RAND() LIMIT 10;`

                pool.query(query1, (err, results) => {

                    if (err) {
                        reject(err)
                    }

                    else {
                        for (let i = 0; i < results.length; i++) {
                            arrResult.push(results[i])
                        }
                        reslove(arrResult)
                    }
                })
            }
        })
    })
}

const countListMovie = () => {
    return new Promise((reslove, reject) => {
        const query = `SELECT COUNT(*) AS 'movie' FROM movie`

        pool.query(query, (err, results) => {

            if (err) {
                reject(err)
            }
            reslove(results)

        })
    })
}

const countList = () => {
    return new Promise((reslove, reject) => {
        const query = `SELECT COUNT(*) AS 'list' FROM list`

        pool.query(query, (err, results) => {

            if (err) {
                reject(err)
            }
            reslove(results)

        })
    })
}


const countUser = () => {
    return new Promise((reslove, reject) => {
        const query = `SELECT COUNT(*) AS 'user' FROM user;`

        pool.query(query, (err, results) => {

            if (err) {
                reject(err)
            }
            reslove(results)

        })
    })
}

const statistical = () => {
    return new Promise(async (reslove, reject) => {
        try {

            let numList = await countList()
            let numMovie = await countListMovie()
            let numUser = await countUser()
            let responseData = {
                movie: numMovie[0].movie,
                list: numList[0].list,
                user: numUser[0].user
            }

            reslove(responseData)

        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    searchMovie: searchMovie,
    statistical: statistical
}