const express = require('express');
const authentication = require('components/authentication/routes');
const user = require('components/user/routes');

const router = express.Router();

router.use('/auth', authentication);
router.use('/users', user);

module.exports = router;
