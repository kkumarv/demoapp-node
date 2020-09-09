/* eslint-disable global-require */
/* eslint-disable import/order */
const app = require('../app');
const conf = require('conf');
const logger = require('lib/logger');


try {
  const server = app.listen(conf.common.serverPort, () => {
    logger.app.info(`Server started on port ${conf.common.serverPort}`);
  });

} catch (err) {
  logger.app.error('Failed to startup server: ', err);
  throw err;
}
