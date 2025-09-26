import { Album } from '../model/album.model';
import Exception from '../exception/exception';
import _ from 'lodash';
import logger from '../logger';

export async function getAlbums() {
	try {
		const fetchedAlbums = await Album.find();
		if (!_.isNil(fetchedAlbums)) {
			return fetchedAlbums;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching albums, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getAlbumById(albumId) {
	try {
		const numericId = Number(albumId);
		if (Number.isNaN(numericId)) {
			return Promise.reject(new Exception(400, 'Invalid album ID'));
		}

		const fetchedAlbum = await Album.findOne({ id: numericId });
		if (!_.isNil(fetchedAlbum)) {
			return fetchedAlbum;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching albums, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}