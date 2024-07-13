import { getSerieAndFilmById, getSeriesAndFilms } from '../service/film-and-serie.service';
import { routerExceptionHandler, routerExceptionHandlerBadRequest } from '../exception/exception.handler';

import { Router } from 'express';
import _ from 'lodash';
import logger from '../logger';

const router = Router();

router.get('/series', async(request, response) => {
	let from = request.query.from;
	if (_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get series from: ${from}`);


	try {
		const fetchedSeries = await getSeriesAndFilms();
		return response.status(200).json(fetchedSeries);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

router.get('/series/:serieId', async(request, response) => {
	const serieId = request.params.serieId;
	if (_.isNil(serieId)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get serie with id: ${serieId}`);

	try {
		const fetchedSerie = await getSerieAndFilmById(serieId);
		return response.status(200).json(fetchedSerie);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

export default router;