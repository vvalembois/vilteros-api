import mongoose from 'mongoose';

delete mongoose.connection.models['Pokemon'];

const PokemonSchema = new mongoose.Schema({
	id: String,
	ndex: String,
	species: String,
	forme: String,
	type1: String,
	type2: String,
	ability1: String,
	ability2: String,
	abilityH: String,
	hp: String,
	attack: String,
	defense: String,
	spattack: String,
	spdefense: String,
	speed: String,
	total: String,
	weight: String,
	height: String,
	percentmale: String,
	percentfemale: String,
	preevolution: String,
	egggroup1: String,
	egggroup2: String,
});

export const Pokemon = mongoose.model('Pokemon', PokemonSchema);