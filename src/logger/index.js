import { createLogger, format, transports } from 'winston';

export default createLogger({
	level: 'debug',
	format: format.combine(
		format.colorize(),
		format.timestamp({
			format: 'DD-MM-YYYY HH:mm:ss'
		}),
		format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [new transports.Console()]
});