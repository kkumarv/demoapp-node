const config = require('conf');
const logger = require('lib/logger');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.host,
    password: config.redis.password,
    db: config.redis.db,
    tls: config.redis.tlsEnabled ? { checkServerIdentity: () => undefined } : null,
    retry_strategy(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    },
});
client.on('error', (err) => {
    logger.app.error(`Error ${err}`);
});

const rawSession = session({
    store: new RedisStore({ client }),
    secret: config.common.sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: config.common.sessionCookieName,
    cookie: {
        maxAge: config.common.sessionCookieMaxAge * 1000,
        secure: config.common.cookieSecure,
        httpOnly: config.common.cookieHttpOnly,
        sameSite: config.common.cookieSameSite,
    },
});

const demoappSession = () => rawSession;

module.exports = { demoappSession, rawSession };
