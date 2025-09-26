import Exception from '../exception/exception';
import { FilmAndSerie } from '../model/film-and-serie.model';
import _ from 'lodash';
import logger from '../logger';

export async function getSeriesAndFilms() {
	try {
		const fetchedSeries = await FilmAndSerie.find();
		if (!_.isNil(fetchedSeries)) {
			return fetchedSeries;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching series, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getSerieAndFilmById(serieId) {
	try {
		const numericId = Number(serieId);
		if (Number.isNaN(numericId)) {
			return Promise.reject(new Exception(400, 'Invalid serie ID'));
		}
		
		const fetchedSerie = await FilmAndSerie.findOne({ id: numericId });
		if (!_.isNil(fetchedSerie)) {
			return fetchedSerie;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching series, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}