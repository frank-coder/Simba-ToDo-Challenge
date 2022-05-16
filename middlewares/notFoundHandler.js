const { StatusCodes } = require('http-status-codes')
const notFoundHandler = async (err,req,res,next) => {
    res.status(StatusCodes.NOT_FOUND).send(err.message)
}
module.exports = notFoundHandler