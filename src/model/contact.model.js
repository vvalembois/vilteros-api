import mongoose from 'mongoose';

delete mongoose.connection.models['Contact'];

const ContactSchema = new mongoose.Schema({
	id: Number,
	firstname: String,
	lastname: String,
	school: String,
	latitude: Number,
	longitude: Number,
	mail: String,
	phone: String,
});

export const Contact = mongoose.model('Contact', ContactSchema);