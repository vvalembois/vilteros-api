import db from './config/db';
import env from './config/env';
import logger from './logger';
import server from './config/express';

(async() => {
	logger.info('Starting app');

	logger.info('Connecting to database');
	db.createConnection().then(() => { return db.initDb(); });

	logger.info(`Starting Express server on port ${env.PORT}`);
	server.listen(env.PORT);

	logger.info('App started');
})();