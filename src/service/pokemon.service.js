import Exception from '../exception/exception';
import { Pokemon } from '../model/pokemon.model';
import _ from 'lodash';
import logger from '../logger';

export async function getPokemons() {
	try {
		const fetchedPokemons = await Pokemon.find();
		if (!_.isNil(fetchedPokemons)) {
			return fetchedPokemons;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching pokemons, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getPokemonsById(pokemonId) {
	try {
		const fetchedPokemon = await Pokemon.findOne({ id: pokemonId });
		if (!_.isNil(fetchedPokemon)) {
			return fetchedPokemon;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching pokemon, with id ${pokemonId} error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}