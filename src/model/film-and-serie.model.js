import mongoose from 'mongoose';

delete mongoose.connection.models['FilmAndSerie'];

const FilmAndSerieSchema = new mongoose.Schema({
	id: Number,
	title: String,
	creationDate: Number,
	description: String,
	type: String,
	thumbnailUrl: String,
});

export const FilmAndSerie = mongoose.model('FilmAndSerie', FilmAndSerieSchema);