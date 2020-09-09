const errorHandler = (err, res) => {
    const { message, errors } = err;
    const statusCode = err.statusCode || 500;
    console.log(errors, message);
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: statusCode >= 500 ? 'Internal Server Error' : message,
        errors,
    });
};

module.exports = errorHandler;
