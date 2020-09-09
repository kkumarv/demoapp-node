require('dotenv').config();

const common = {
    domain: process.env.DOMAIN || 'app.trainerio.com',
    serverPort: process.env.SERVER_PORT ? Number.parseInt(process.env.SERVER_PORT, 10) : 3434,
    sessionSecret: process.env.SESSION_SECRET || 'secret',
    sessionCookieName: process.env.SESSION_COOKIE_NAME || 'sId',
    sessionCookieMaxAge: process.env.SESSION_COOKIE_MAX_AGE ? Number.parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10) : 100000,
    cookieSecure: !!+process.env.COOKIE_SECURE,
    cookieHttpOnly: !!+process.env.COOKIE_HTTP_ONLY,
    cookieSameSite: process.env.COOKIE_SAME_SITE,
    resourcesPath: process.env.RESOURCES_PATH || '/app/resources',
};

module.exports = common;
