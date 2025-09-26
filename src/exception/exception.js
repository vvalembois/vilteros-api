export default class Exception extends Error {
	constructor(status, message) {
		super(message); // Pass message to the built-in Error
		this.status = status;
		this.name = this.constructor.name; // Optional: makes debugging clearer
	}
}