const logger = require('lib/logger');
const {
    v4: uuid,
} = require('uuid');

const userServices = require('components/user/services');



exports.getUserBySession = async (req, res) => {
    logger.app.debug('START_CONTROLLER_METHOD: getUserBySession');
    const user = await userServices.getUserProfileById('data', req.user.id, true);
    res.status(200).json(user);
};
