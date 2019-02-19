import logger from './winston';

// By default, morgan outputs to the console only,
// so let's define a stream function that will be able
// to get morgan-generated output into the winston log files.
// We will use the info level so the output will be picked up by both transports (file and console):

// create a stream object with a 'write' function that will be used by `morgan`

export const morganOption = {
    stream: {
        write: function(message: string) {
            // use the 'info' log level so the output will be picked up by both transports (file and console)
            logger.info(message.trim());
        },
    },
};
