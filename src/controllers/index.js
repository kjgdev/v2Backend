const authCotroller = require('./auth/auth.controller')
const movieRouter = require('./movie/movie.controller')

module.exports = {
    authCotroller: authCotroller,
    movieRouter:movieRouter
}