const express = require('express');

const passport = require('passport');
const {
    asyncWrapper,
} = require('lib/middleware');


const controller = require('./controller');

const router = express.Router();

router.post('/login', asyncWrapper(controller.login));
router.get('/logout', asyncWrapper(controller.logout));


module.exports = router;
