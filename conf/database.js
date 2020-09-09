require('dotenv').config();

const database = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgres',
        define: {
            timestamps: false,
            omitNull: true,
        },
        logging: null,
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgres',
        define: {
            timestamps: false,
            omitNull: true,
        },
        logging: null,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgres',
        define: {
            timestamps: false,
            omitNull: true,
        },
        logging: null,
    },
};

module.exports = database;
