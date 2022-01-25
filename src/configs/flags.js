const errorResponse = (res, err) => {
    console.error(err)
    switch (err.errno) {
        case 100:{
            res.sendStatus(401)
            break;
        }
        case 1062: {
            res.sendStatus(422)
            break;
        }
        case 1452: {
            res.sendStatus(404)
            break;
        }
        default: {
            res.statusCode = 500
            res.json({
                massage: err.massage
            })
            break;
        }
    }

}

module.exports = {
    errorResponse: errorResponse,
}