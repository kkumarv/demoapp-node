/* eslint-disable no-unused-vars */
require('app-module-path').addPath(__dirname);
require('dotenv').config();
const express = require('express');
const compression = require('compression');
const middlewares = require('lib/middleware');
const passport = require('passport');
const {
    json,
    urlencoded,
} = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();

// for health check
app.use('/health-check', (req, res) => {
    res.status(200).end();
});

// trust first proxy
app.enable('trust proxy');

// enable helmet for security
app.use(helmet());



// try to parse request bodies as json
app.use(cookieParser());
app.use(json({
    limit: process.env.FILE_UPLOAD_MAX_SIZE,
    type: 'application/json',
}));
app.use(urlencoded({
    limit: process.env.FILE_UPLOAD_MAX_SIZE,
    extended: true,
}));

// initialize passport (authentication)
app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.authenticate('remember-me'));

app.get('/api/wake-up', (req, res) => res.send('👍'));
// define routes
app.use('/api', routes);

app.use((req, res) => {
    res.status(404).send(JSON.stringify({
        error: {
            status: 404,
            message: 'Resource not found',
        },
    }));
});

app.use((err, req, res, next) => {
    middlewares.errorHandler(err, res);
});

module.exports = app;
