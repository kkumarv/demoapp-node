const express = require('express');
const authentication = require('components/authentication/routes');
const user = require('components/user/routes');
const banking = require('components/banking/routes');

const router = express.Router();

router.use('/auth', authentication);
router.use('/users', user);
router.use('/banking', banking);

module.exports = router;
