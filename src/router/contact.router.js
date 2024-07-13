import { getInternById, getInterns } from '../service/contact.service';
import { routerExceptionHandler, routerExceptionHandlerBadRequest } from '../exception/exception.handler';

import { Router } from 'express';
import _ from 'lodash';
import logger from '../logger';

const router = Router();

router.get('/interns', async(request, response) => {
	let from = request.query.from;
	if (_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Interns from: ${from}`);

	try {
		const fetchedUser = await getInterns();
		return response.status(200).json(fetchedUser);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

router.get('/interns/:internId', async(request, response) => {
	const internId = request.params.internId;
	if (_.isNil(internId)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get intern with id: ${internId}`);

	try {
		const fetchedIntern = await getInternById(internId);
		return response.status(200).json(fetchedIntern);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

export default router;