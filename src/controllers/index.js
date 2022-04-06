const authCotroller = require('./auth/auth.controller')
const movieController = require('./movie/movie.controller')
const listController = require('./list/list.controller')
const userController = require('./user/user.controller')
const controlController = require('./control/control.controller')
const settingController = require('./settings/settings.controller')

module.exports = {
    authCotroller: authCotroller,
    movieController:movieController,
    listController:listController,
    userController:userController,
    controlController:controlController,
    settingController,
}