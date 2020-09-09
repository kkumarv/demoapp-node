const database = require('./database');
const redis = require('./redis');
const logger = require('./logger');
const common = require('./common');

module.exports = {
    database,
    redis,
    logger,
    common,
};
