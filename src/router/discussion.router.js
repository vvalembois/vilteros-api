import { routerExceptionHandler, routerExceptionHandlerBadRequest } from '../exception/exception.handler';

import { Router } from 'express';
import _ from 'lodash';
import env from '../config/env';
import { getDiscussions } from '../service/discussion.service';
import logger from '../logger';
import pug from 'pug';

const router = Router();

const compileDiscussionFunction = pug.compileFile(getViewPath() + '/discussions.pug');

router.get('/discussions-interface', async(request, response) => {
	logger.debug('Get Discussions Interface');
	let from = request.query.from;
	if (_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}

	response.status(200).send(compileDiscussionFunction({
		url: env.URL,
		name: from
	}));
});

router.get('/discussions', async(request, response) => {
	let from = request.query.from;
	if (_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Discussion from: ${from}`);

	try {
		const fetchedDiscussions = await getDiscussions();
		return response.status(200).json(fetchedDiscussions);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

function getViewPath() {
	return __dirname.replace('/src/router', '/views');
}

export default router;