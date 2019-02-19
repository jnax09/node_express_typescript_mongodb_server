const appRoot = require('app-root-path');
const winston = require('winston');
require('winston-mongodb');

// winston: simple and universal logging library

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        prettyPrint: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint: true,
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
        new winston.transports.MongoDB({
            db: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production' ?
                process.env.MONGO_URI : process.env.MONGO_URI_TEST,
            collection: 'logs'
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: `${appRoot}/logs/unCaughtExceptions.log`,
        }),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger