import { getPokemons, getPokemonsById } from '../service/pokemon.service';
import { routerExceptionHandler, routerExceptionHandlerBadRequest } from '../exception/exception.handler';

import { Router } from 'express';
import _ from 'lodash';
import logger from '../logger';

const router = Router();

router.get('/pokemons', async(request, response) => {
	let from = request.query.from;
	if (_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Pokemons from: ${from}`);

	try {
		const fetchedShop = await getPokemons();
		return response.status(200).json(fetchedShop);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

router.get('/pokemons/:pokemonId', async(request, response) => {
	const pokemonId = request.params.pokemonId;
	if (_.isNil(pokemonId)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get pokemon with id : ${pokemonId}`);

	try {
		const fetchedShop = await getPokemonsById(pokemonId);
		return response.status(200).json(fetchedShop);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

export default router;