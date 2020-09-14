const express = require('express');
const {
    asyncWrapper
} = require('lib/middleware');

const controller = require('./controller');

const router = express.Router();



router.get('/users',asyncWrapper(controller.getUserBySession));
router.get('/users/:userId',asyncWrapper(controller.getUserBySession));
router.put('/users/:userId',asyncWrapper(controller.getUserBySession));
router.get('/users/:userId/accounts/',asyncWrapper(controller.getUserBySession));
router.get('/users/:userId/accounts/:accountId',asyncWrapper(controller.getUserBySession));

module.exports = router;
