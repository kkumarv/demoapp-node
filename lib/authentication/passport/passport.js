/* eslint-disable no-underscore-dangle */
const {
    v4: uuid,
} = require('uuid');
const logger = require('lib/logger');
const passport = require('passport');
const models = require('db/models');
const config = require('conf');
const {
    Op,
} = require('sequelize');
const ErrorHandler = require('lib/errorHandler');

module.exports = () => {
    // Adding each OAuth provider's strategy to passport
    // passport.use(new GoogleStrategy(config.authentication.google, callback));

    passport.serializeUser((user, done) => {
        done(null, user.id);
        return null;
    });

    passport.deserializeUser((id, done) => {
        models.User.findOne({
            attributes: ['id', 'first_name', 'last_name', 'username', 'status', 'tenant_id', 'created_on'],
            where: {
                id,
            },
            include: [{
                model: models.UserRole,
                attributes: ['slug'],
                through: {
                    attributes: [],
                },
            }, {
                model: models.UserProfile,
            }, {
                model: models.User,
                attributes: ['id', 'first_name', 'last_name', 'username'],
                as: 'trainer',
            }, {
                model: models.User,
                attributes: ['id', 'first_name', 'last_name', 'username'],
                as: 'clients',
            }],
        }).then((user) => {
            const returnUser = user.get({
                plain: true,
            });
            done(null, returnUser);
            return null;
        }).catch((err) => {
            done(err, null);
            return null;
        });
    });
};
