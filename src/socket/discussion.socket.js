import { getDiscussionsWithAllInformations, getMessagesForDiscussionWithId, saveMessageInBDD } from '../service/discussion.service';

import _ from 'lodash';
import logger from '../logger';

export default function(socket) {
	socket.on('message', async function(data) {
		try {
			const dataObject = JSON.parse(data);
			const message = await saveMessageInBDD(dataObject);
			const messageJson = JSON.stringify(_.reverse(message));
			socket.broadcast.emit('message', messageJson);
			socket.emit('message', messageJson);
		} catch (error) {
			logger.error('Socket Message error' + error);
		}
	});

	socket.on('history-discussion', async function(data) {
		try {
			const dataObject = JSON.parse(data);
			const messages = await getMessagesForDiscussionWithId(dataObject.discussionId);
			const result = JSON.stringify(_.reverse(messages));
			socket.emit('messages', result);
		} catch (error) {
			logger.error('Socket History Discussion error' + error);
		}
	});

	socket.on('history-discussions', async function(_) {
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
			const result = JSON.stringify(discussions);
			socket.emit('discussions', result);
		} catch (error) {
			logger.error('Socket History Discussion error' + error);
		}
	});
}