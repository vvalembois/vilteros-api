import { Router } from 'express';
import env from '../config/env';
import logger from '../logger';
import pug from 'pug';

const router = Router();

const compileHomeFunction = pug.compileFile(getViewPath() + '/home.pug');

router.get('/', async(request, response) => {
	logger.debug('Get Root page');

	response.status(200).send(compileHomeFunction({
		url: env.URL
	}));
});

function getViewPath() {
	return __dirname.replace('/src/router', '/views');
}

export default router;