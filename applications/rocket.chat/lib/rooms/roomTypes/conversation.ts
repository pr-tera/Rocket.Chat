import type { IRoomTypeConfig } from '@rocket.chat/core-typings';

import type { RoomCoordinator } from '../coordinator';

export function getConversationRoomType(_coordinator: RoomCoordinator): IRoomTypeConfig {
	return {
		identifier: 'merged',
		order: 30,
		label: 'Conversations',
	};
}