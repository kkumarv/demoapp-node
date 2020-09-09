require('dotenv').config();

const authentication = {
    logLevel: process.env.AUTHENTICATION_LOG_LEVEL || 'info',
    token_secret: process.env.AUTHENTICATION_TOKEN_SECRET,
    token_lifetime: Number.parseInt(process.env.AUTHENTICATION_TOKEN_LIFETIME, 10) || 10,
   
};

module.exports = authentication;
