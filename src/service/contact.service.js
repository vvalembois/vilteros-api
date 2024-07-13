import { Contact } from '../model/contact.model';
import Exception from '../exception/exception';
import _ from 'lodash';
import logger from '../logger';

export async function getInterns() {
	try {
		const fetchedUsers = await Contact.find();
		if (!_.isNil(fetchedUsers)) {
			return fetchedUsers;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching interns, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getInternById(internId) {
	try {
		const fetchedUser = await Contact.findOne({ id: internId });
		if (!_.isNil(fetchedUser)) {
			return fetchedUser;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching intern, with id ${internId} error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}