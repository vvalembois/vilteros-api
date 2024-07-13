import { albumsFiles, articleFiles, discussionFiles, gamesFiles, internsFiles, pokemonsFiles, seriesFiles } from './constant/db';

import { Album } from '../model/album.model';
import { Article } from '../model/shop/article.model';
import { Contact } from '../model/contact.model';
import { Discussion } from '../model/discussion.model';
import { FilmAndSerie } from '../model/film-and-serie.model';
import { Game } from '../model/game.model';
import MongoMemoryServer from 'mongodb-memory-server-core';
import { Pokemon } from '../model/pokemon.model';
import env from './env';
import fs from 'fs';
import logger from '../logger';
import mongoUriBuilder from 'mongo-uri-builder';
import mongoose from 'mongoose';

export class DB {

	constructor() {
		this._inMemoryMongoInstance = null;
	}

	async createConnection() {
		if (!env.DB_URL) {
			return this._createInMemoryConnection()
				.catch(err => logger.error('Error connected to remote In memory MongoDB database: ' + err));
		}
		return this._createRemoteConnection()
			.then(() => logger.info('Successfully connected to remote MongoDB database.'))
			.catch(err => logger.error('Error connected to remote MongoDB database: ' + err));
	}

	async _createRemoteConnection() {
		return mongoose.connect(
			mongoUriBuilder({
				username: env.DB_USERNAME,
				password: env.DB_PASSWORD,
				host: env.DB_URL,
				port: env.DB_PORT,
				database: env.DB_NAME
			}), { useNewUrlParser: true, }
		);
	}

	async _createInMemoryConnection() {
		this._inMemoryMongoInstance = await MongoMemoryServer.create();
		const uri = await this._inMemoryMongoInstance.getUri();
		return mongoose.connect(uri, { useNewUrlParser: true, });
	}

	async _initDataGames() {
		logger.info('Initializing test data: Games');
		const rawApplicationGames = fs.readFileSync(gamesFiles, 'utf8');

		const jsonApplicationGames = JSON.parse(rawApplicationGames);

		return Promise.all(
			jsonApplicationGames.map((game) => {
				const gameSchema = new Game(game);
				return gameSchema.save();
			})
		).then(logger.info('Initializing test data: Games finished'));
	}

	async _initDataFilmsAndSeries() {
		logger.info('Initializing test data: Films and Series');
		const rawApplicationSeries = fs.readFileSync(seriesFiles, 'utf8');

		const jsonApplicationSeries = JSON.parse(rawApplicationSeries);

		return Promise.all(
			jsonApplicationSeries.map((serie) => {
				const serieSchema = new FilmAndSerie(serie);
				return serieSchema.save();
			})
		).then(logger.info('Initializing test data: Films and Series finished'));
	}

	async _initDataAlbums() {
		logger.info('Initializing test data: Albums');
		const rawApplicationAlbums = fs.readFileSync(albumsFiles, 'utf8');

		const jsonApplicationAlbums = JSON.parse(rawApplicationAlbums);

		return Promise.all(
			jsonApplicationAlbums.map((album) => {
				const albumSchema = new Album(album);
				return albumSchema.save();
			})
		).then(logger.info('Initializing test data: Albums finished'));
	}

	async _initDataShop() {
		logger.info('Initializing test data: Shop');
		const rawApplicationArticles = fs.readFileSync(articleFiles, 'utf8');

		const jsonApplicationArticles = JSON.parse(rawApplicationArticles);

		return Promise.all(
			jsonApplicationArticles.map((article) => {
				const articleSchema = new Article(article);
				return articleSchema.save();
			})
		).then(logger.info('Initializing test data: Shop finished'));
	}

	async _initDataContacts() {
		logger.info('Initializing test data: interns');
		const rawApplicationContacts = fs.readFileSync(internsFiles, 'utf8');

		const jsonApplicationContacts = JSON.parse(rawApplicationContacts);

		return Promise.all(
			jsonApplicationContacts.map((intern) => {
				const internSchema = new Contact(intern);
				return internSchema.save();
			})
		).then(logger.info('Initializing test data: Interns finished'));
	}

	async _initDataPokemons() {
		logger.info('Initializing test data: Pokemons');
		const rawApplicationPokemon = fs.readFileSync(pokemonsFiles, 'utf8');

		const jsonApplicationPokemons = JSON.parse(rawApplicationPokemon);

		return Promise.all(
			jsonApplicationPokemons.map((pokemon) => {
				const internSchema = new Pokemon(pokemon);
				return internSchema.save();
			})
		).then(logger.info('Initializing test data: Pokemons finished'));
	}

	async _initDataDiscussions() {
		logger.info('Initializing test data: Disussions');
		const rawApplicationDisucssions = fs.readFileSync(discussionFiles, 'utf8');

		const jsonApplicationDiscussions = JSON.parse(rawApplicationDisucssions);

		return Promise.all(
			jsonApplicationDiscussions.map((discussion) => {
				const discussionSchema = new Discussion(discussion);
				return discussionSchema.save();
			})
		).then(logger.info('Initializing test data: Pokemons finished'));
	}

	async initDb() {
		await this._clearDataBase();
		return Promise.all([
			this._initDataGames(),
			this._initDataAlbums(),
			this._initDataShop(),
			this._initDataContacts(),
			this._initDataPokemons(),
			this._initDataFilmsAndSeries(),
			this._initDataDiscussions()
		]);
	}

	async _clearDataBase() {
		const collections = mongoose.connection.collections;

		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany();
		}
	}
}

const db = new DB();

export default db;