const express = require('express');
const {
    asyncWrapper
} = require('lib/middleware');

const controller = require('./controller');

const router = express.Router();



router.get('/profile',asyncWrapper(controller.getUserBySession));

module.exports = router;
