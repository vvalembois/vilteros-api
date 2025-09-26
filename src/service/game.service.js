import Exception from '../exception/exception';
import { Game } from '../model/game.model';
import _ from 'lodash';
import logger from '../logger';

export async function getGames() {
	try {
		const fetchedGames = await Game.find();
		if (!_.isNil(fetchedGames)) {
			return fetchedGames;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching games, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getGameById(gameId) {
	try {
		const numericId = Number(gameId);
		if (Number.isNaN(numericId)) {
			return Promise.reject(new Exception(400, 'Invalid game ID'));
		}
		const fetchedGame = await Game.findOne({ id: numericId });
		if (!_.isNil(fetchedGame)) {
			return fetchedGame;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching game, with id ${gameId} error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}