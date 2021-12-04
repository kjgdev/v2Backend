const errorResponse = (res, err) => {
    switch (err.errno) {
        case 100:{
            res.sendStatus(403)
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