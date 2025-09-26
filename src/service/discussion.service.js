import { Discussion } from '../model/discussion.model';
import Exception from '../exception/exception';
import _ from 'lodash';
import logger from '../logger';
import moment from 'moment';

export async function saveMessageInBDD(message) {
	try {
		message.date = moment().format();
		const fetchedDiscussion = await Discussion.findOne({ id: message.discussionId });
		fetchedDiscussion.messages.push(message);
		fetchedDiscussion.save();
		return message;
	} catch (error) {
		logger.error(`Error while saving message, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getDiscussions() {
	try {
		const fetchedDiscussion = await Discussion.find();
		if (!_.isNil(fetchedDiscussion)) {
			return _.flatMap(fetchedDiscussion, function(discussion) {
				discussion.messages = [];
				return discussion;
			});
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching discussions, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getDiscussionsWithAllInformations() {
	try {
		const fetchedDiscussion = await Discussion.find();
		if (!_.isNil(fetchedDiscussion)) {
			return fetchedDiscussion;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching discussions with all informations, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getMessagesForDiscussionWithId(id) {
	try {
		const numericId = Number(id);
		if (Number.isNaN(numericId)) {
			return Promise.reject(new Exception(400, 'Invalid discussion ID'));
		}
		
		const fetchedDiscussion = await Discussion.findOne({ id: numericId });
		if (!_.isNil(fetchedDiscussion)) {
			return _.reverse(fetchedDiscussion.messages);
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching messages for discussion ${id}, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}