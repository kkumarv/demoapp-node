/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const winston = require('winston');

const { format } = winston;
const config = require('conf/logger');


// Configure the logger for `app`
let transportsForAll = [
    new winston.transports.Console({ level: config.level }),
    new winston.transports.File({ filename: config.logfile }),
];
if (process.env.NODE_ENV === 'test') {
    transportsForAll = [
        new winston.transports.File({ filename: config.logfile }),
    ];
}

winston.loggers.add('app', {
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        format.printf(
            (info) => {
                const { level, ...meta } = info;
                const req = (meta && meta.req) ? meta.req : false;
                if (req && req.trainerio) {
                    const parsedMessage = JSON.parse(info.message);
                    parsedMessage.tenant = req.trainerio.tenantUrl;
                    parsedMessage.edge = req.trainerio.edgeKey;
                    info.message = JSON.stringify(parsedMessage);
                }
                return `${info.timestamp} ${info.level} : ${info.message}`;
            },
        ),
    ),
    transports: transportsForAll,
});



exports.app = winston.loggers.get('app');

