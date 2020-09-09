/* eslint-disable max-len */
require('../../app');
const { v4: uuid } = require('uuid');
const authHelpers = require('utils/helper/auth');


const users = [{
  id: uuid(),
  username: 'demo@demo.com',
  first_name: 'test',
  last_name: 'user',
  password: 'password',
},
];

module.exports = {
  up: async (queryInterface) => {
    const userInserts = await Promise.all(users.map(async (user) => {
      user.password = await authHelpers.hashPassword(user.password);
      return user;
    })).then((results) => results);
    await queryInterface.bulkInsert('users', userInserts, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
