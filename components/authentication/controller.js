const logger = require('lib/logger');
const passportLocal = require('lib/authentication/passport/local');
const authHelper = require('utils/helper/auth');


const config = require('conf');
const ErrorHandler = require('lib/errorHandler');

exports.login = (req, res, next) => {
    passportLocal.authenticate('local', {
        session: false,
    }, async (err, user, info) => {
        console.log("user", err)
        if (err) {
            next(err);
        }
        if (info) {
            return next(new ErrorHandler('AUTHENTICATION_FAILED', info, 400));
        }
        if (!user) {
            return next(new ErrorHandler('BAD_CREDENTIALS', 'Bad credentials', 400));
        }
        if (user) {
        
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    return next(new ErrorHandler('AUTHENTICATION_ERROR', 'interal server error', 500, loginErr));
                }
                return res.json({ data: user });
            });
        }
    })(req, res, next);
};


exports.logout = (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return next(new ErrorHandler('AUTHENTICATION_ERROR', 'interal server error', 500, err));
        }
        logger.app.debug(`User successfully logged off, authenticated`);
        res.clearCookie(config.common.sessionCookieName);
        return res.status(200).json({
            status: 'success',
        });
    });
};

