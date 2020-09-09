const logger = require('lib/logger');
const models = require('db/models');
const ErrorHandler = require('lib/errorHandler');



const getUserProfileById = async (tenantId, userId, isFrontOffice = true, transaction = null) => {
    logger.app.debug('START_SERVICE_METHOD: getUserById');
    if (!tenantId || !userId) {
        throw new ErrorHandler('ARGUMENT_MISSING', 'Missing argument in function call', 400);
    }
    return models.User.findOne({
        where: {
            id: userId,
        },
    }).then((user) => {
        if (!user) {
            throw new ErrorHandler('USER_NOT_FOUND', 'User does not exist', 404);
        }
        return user.get({
            plain: true,
        });
    }).catch((err) => {
        switch (err.name) {
            case 'USER_NOT_FOUND':
                throw err;
            default:
                // throw err;
                throw new ErrorHandler('QUERY_ERROR', 'Failed to get user by id from database.', 500, err);
        }
    });
};



module.exports = {
  
    getUserProfileById,
  
};
