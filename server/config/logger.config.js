import log4js from 'log4js';

log4js.configure({
    appenders: {
        errorLogs: { type: 'file', filename: 'error.log' },
        console: { type: 'console' }
    },
    categories: {
        error: { appenders: ['errorLogs'], level: 'error' },
        default: { appenders: ['console', 'errorLogs'], level: 'trace' }
    }
});

const logger = log4js.getLogger('error');

export default logger;
