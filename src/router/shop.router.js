import { Router } from 'express';
import logger from '../logger';
import _ from 'lodash';
import { routerExceptionHandler, routerExceptionHandlerBadRequest } from '../exception/exception.handler';
import { getArticleById, getArticles, getShop } from '../service/shop.service';

const router = Router();

router.get('/shop', async (request, response) => {
	let from = request.query.from;
	if(_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Shop from: ${from}`);

	try {
		const fetchedShop = await getShop();
		return response.status(200).json(fetchedShop);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

router.get('/articles', async (request, response) => {
	let from = request.query.from;
	if(_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Articles from: ${from}`);

	try {
		const fetchedShop = await getArticles();
		return response.status(200).json(fetchedShop);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

router.get('/articles/:articlesId', async (request, response) => {
	const articleId = request.params.pokemonId;
	if(_.isNil(articleId)) {
		return routerExceptionHandlerBadRequest(response);
	}

	logger.debug(`Get articles with id : ${articleId}`);
	try {
		const fetchedArticle = await getArticleById(articleId);
		return response.status(200).json(fetchedArticle);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

export default router;
