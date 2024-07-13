import logger from '../logger';

export function routerExceptionHandler(exception, response) {
	if (exception.status === 500 || !exception.status) {
		logger.error(exception);
		return response.status(500).json({ message: 'Internal server error' });
	}
	return response.status(exception.status).json(exception.message);
}

export function routerExceptionHandlerBadRequest(response) {
	return response.status(400).json('Bad request');
}