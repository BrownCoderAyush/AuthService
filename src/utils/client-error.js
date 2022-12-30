const { StatusCodes } = require('http-status-codes');
const AppError = require('./error-handler');


class ClientError extends AppError{
    constructor(name , message , explaination , statusCode ){
        super(
            name,
            message,
            explaination,
            statusCode
        )
    }
}


module.exports = ClientError;