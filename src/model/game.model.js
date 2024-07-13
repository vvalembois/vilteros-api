import mongoose from 'mongoose';

delete mongoose.connection.models['Game'];

const GameSchema = new mongoose.Schema({
	id: Number,
	name: String,
	note: Number,
	synopsis: String,
});

export const Game = mongoose.model('Game', GameSchema);