import { getGameById, getGames } from '../service/game.service';
import { routerExceptionHandler, routerExceptionHandlerBadRequest } from '../exception/exception.handler';

import { Router } from 'express';
import _ from 'lodash';
import logger from '../logger';

const router = Router();

router.get('/games', async(request, response) => {
	let from = request.query.from;
	if (_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Games from: ${from}`);
	try {
		const fetchedGames = await getGames();
		return response.status(200).json(fetchedGames);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

router.get('/games/:gameId', async(request, response) => {
	const gameId = request.params.gameId;
	if (_.isNil(gameId)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Games with id : ${gameId}`);

	try {
		const fetchedGame = await getGameById(gameId);
		return response.status(200).json(fetchedGame);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

export default router;