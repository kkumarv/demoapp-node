const logger = require('lib/logger');

class ErrorHandler extends Error {
    constructor(name, message = null, statusCode = 500, initialError = null) {
        super();
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        try {
            if (this.name === 'VALIDATION_ERROR') {
                this.message = 'request validation failed';
                this.errors = message;
            }
            if (this.name === 'QUERY_ERROR') {
                if (initialError.errors && initialError.errors.length > 0) {
                    this.statusCode = this.getStatusCodeByErrorType(initialError.errors[0].type);
                    this.errors = [{
                        value: initialError.errors[0].value,
                        msg: initialError.errors[0].message,
                        param: initialError.errors[0].path,
                        type: initialError.errors[0].type,
                    }];
                }
                if (initialError.name === 'SequelizeDatabaseError') {
                    this.statusCode = this.getStatusCodeByErrorType(initialError.original.code);
                    this.errors = [{
                        msg: 'Invalid text representation',
                    }];
                }
            }
            if (this.name === 'APIGEE_ERROR') {
                this.statusCode = initialError.statusCode;
                if (this.statusCode === 401) {
                    this.message = 'Unauthorized';
                }
                const edgeMessage = initialError.message.replace(/^\d+ -/, '');
                const parsedMessage = JSON.parse(JSON.parse(edgeMessage));
                this.message = parsedMessage.message;
            }

            if (!message) {
                this.message = this.getReadableErrorMessageByName();
            }
            const errorDetails = this.parseStack();
            if (this.statusCode < 500) {
                // TODO: find appropriate log level
                logger.app.info(`${errorDetails.fileName}, method: ${errorDetails.method}, Line: ${errorDetails.line}, Column: ${errorDetails.column}, name: ${this.name}, message: ${this.message}`, initialError);
            } else {
                logger.app.error(`${errorDetails.fileName}, method: ${errorDetails.method}, Line: ${errorDetails.line}, Column: ${errorDetails.column}, name: ${this.name}, message: ${this.message}`, initialError);
            }
        } catch (err) {
            logger.app.error('Error while writing error log: ', err);
        }
    }

    /**
     * try to find a status code based on error type
     *
     * TODO: perhaps create a error message json to make it more readable
     *
     * @function getStatusCodeByErrorType
     *
     *
     * @returns {string}
     *
     */
    // eslint-disable-next-line class-methods-use-this
    getStatusCodeByErrorType(value) {
        switch (value) {
            case '22P02':
                return 422;
            case 'unique violation':
                return 409;
            default:
                return 500;
        }
    }

    /**
     * try to find an error message by error name if no message is provided
     *
     * TODO: perhaps create a error message json to make it more readable
     *
     * @function getReadableErrorMessageByName
     *
     *
     * @returns {string}
     *
     */
    getReadableErrorMessageByName() {
        switch (this.name) {
            case 'INTERNAL_SERVER_ERROR':
            default:
                return 'Internal Server Error';
        }
    }

    /**
     * parse error stack to get more information about the error
     *
     *
     * @function getReadableErrorMessageByName
     *
     *
     * @returns {object} - with { method, fileName, line, column}
     *
     */
    parseStack() {
        const stackArray = this.stack.split('\n');

        let method = '';
        let fileName = '';
        let line = 0;
        let column = 0;
        stackArray.map((row) => {
            const tempRow = row.trim();
            const parts = tempRow.split(' ');
            if (parts[0] === 'at') {
                if (parts[1] && !method && !parts[1].startsWith('/')) {
                    [, method] = parts;
                    method = method.replace('exports.', '');
                }
                if ((parts[2] || parts[1].startsWith('/')) && !fileName) {
                    let [, , location] = parts;
                    if (parts[1].startsWith('/')) {
                        [, location] = parts;
                        method = 'unknown';
                    } else {
                        location = location.slice(1, -1);
                    }

                    if (location !== '<anonymous>') {
                        const fileNameParts = location.split(':');
                        if (fileNameParts.length === 3) {
                            [fileName, line, column] = fileNameParts;
                        }
                    }
                }
            }
            return row;
        });
        return {
            method,
            fileName,
            line,
            column,
        };
    }
}

module.exports = ErrorHandler;
