require('dotenv').config();

const redis = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number.parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || 'test',
    database: process.env.REDIS_DB || 1,
    tlsEnabled: !!+process.env.REDIS_TLS_ENABLED,
    connectionRetries: Number.parseInt(process.env.REDIS_CONNECTION_RETRIES, 10) || 10,
};

module.exports = redis;
