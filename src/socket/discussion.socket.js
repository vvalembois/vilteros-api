import { getDiscussionsWithAllInformations, getMessagesForDiscussionWithId, saveMessageInBDD } from '../service/discussion.service';
import _ from 'lodash';
import logger from '../logger';

export default function(socket) {
	// Handle new message
	socket.on('message', async function(data) {
		try {
			const dataObject = JSON.parse(data);
			const message = await saveMessageInBDD(dataObject);

			// If message is an array, reverse it, otherwise wrap in array
			const messageArray = Array.isArray(message) ? message.slice().reverse() : [message];

			socket.broadcast.emit('message', messageArray);
			socket.emit('message', messageArray);
		} catch (error) {
			logger.error('Socket Message error: ' + error);
		}
	});

	// Fetch history of a single discussion
	socket.on('history-discussion', async function(data) {
		try {
			const dataObject = JSON.parse(data);
			const messages = await getMessagesForDiscussionWithId(dataObject.discussionId);

			const reversedMessages = Array.isArray(messages) ? messages.slice().reverse() : [];
			socket.emit('messages', reversedMessages);
		} catch (error) {
			logger.error('Socket History Discussion error: ' + error);
		}
	});

	// Fetch all discussions
	socket.on('history-discussions', async function() {
		try {
			const fetchedDiscussions = await getDiscussionsWithAllInformations();

			const discussions = _.map(fetchedDiscussions, function(discussion) {
				return {
					discussionId: discussion.id,
					name: discussion.name,
					message: _.last(discussion.messages).message,
					confidential: discussion.confidential
				};
			});

			socket.emit('discussions', discussions);
		} catch (error) {
			logger.error('Socket History Discussions error: ' + error);
		}
	});
}