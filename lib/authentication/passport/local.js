const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authHelpers = require('utils/helper/auth');
const models = require('db/models');
const logger = require('lib/logger');
const ErrorHandler = require('lib/errorHandler');
const init = require('./passport');

init();

passport.use(new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {
    logger.app.debug('Autenticate User with LocalStrategy');

    return models.User.findOne({
      //  attributes: ['id', 'tenant_id', 'first_name', 'last_name', 'username', 'password', 'is_totp_verified', 'is_totp_enabled', 'login_attempts', 'status'],
        where: {
            username: username.toLowerCase(),
        },
    }).then(async (user) => {
        if (!user || user === null) {
            done(null, false, null);
            return null;
        }
        logger.app.debug('Validate User Password');
        if (!await authHelpers.comparePass(password, user.password)) {
            return done(new ErrorHandler('USER_NOT_FOUND', 'User not found', 404));
        }
    
        const returnUser = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
        };
        done(null, returnUser);
        return null;
    }).catch(() => {
        done(null, false, null);
        return null;
    });
}));

module.exports = passport;
