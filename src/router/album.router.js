import { getAlbumById, getAlbums } from '../service/album.service';
import { routerExceptionHandler, routerExceptionHandlerBadRequest } from '../exception/exception.handler';

import { Router } from 'express';
import _ from 'lodash';
import logger from '../logger';

const router = Router();

router.get('/albums', async(request, response) => {
	let from = request.query.from;
	if (_.isNil(from)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get Albums from: ${from}`);


	try {
		const fetchedAlbum = await getAlbums();
		return response.status(200).json(fetchedAlbum);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

router.get('/albums/:albumId', async(request, response) => {
	const albumId = request.params.albumId;
	if (_.isNil(albumId)) {
		return routerExceptionHandlerBadRequest(response);
	}
	logger.debug(`Get album with id: ${albumId}`);

	try {
		const fetchedAlbum = await getAlbumById(albumId);
		return response.status(200).json(fetchedAlbum);
	} catch (error) {
		routerExceptionHandler(error, response);
	}
});

export default router;