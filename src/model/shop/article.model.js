import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
	id: Number,
	name: String,
	prix: Number,
	marque: String,
	content: String,
});

export const Article = mongoose.model('Article', ArticleSchema);