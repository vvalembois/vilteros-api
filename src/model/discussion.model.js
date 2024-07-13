import mongoose from 'mongoose';

delete mongoose.connection.models['Discussion'];

const DiscussionSchema = new mongoose.Schema({
	id: Number,
	name: String,
	confidential: Boolean,
	messages: [{
		discussionId: Number,
		author: String,
		message: String,
		date: Date
	}],
});

export const Discussion = mongoose.model('Discussion', DiscussionSchema);