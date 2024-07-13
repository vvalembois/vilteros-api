import mongoose from 'mongoose';

delete mongoose.connection.models['Album'];

const AlbumSchema = new mongoose.Schema({
	id: Number,
	title: String,
	artist: String,
	year: String,
	music: [String],
});

export const Album = mongoose.model('Album', AlbumSchema);