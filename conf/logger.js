require('dotenv').config();

const logger = {
    enabled: !!+process.env.LOGGER_ENABLED,
    level: process.env.LOGGER_LOG_LEVEL || 'info',
    logfile: process.env.LOGGER_FILE_PATH || './logs',
    auditFile: process.env.AUDIT_LOG_FILE_PATH || './logs/audit.log',
};

module.exports = logger;
