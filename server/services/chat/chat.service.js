import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import chatRepository from '#repositories/chat/chat.repository';

class ChatService {
    async getAllChats(params, userId) {
        try {
            let {
                limit,
                offset
            } = params;
            offset = (offset - 1) * limit;

            const res = await chatRepository.getAllChats(limit, offset);
            const chats = res.toJSON();
            const totalItem = res.pagination.rowCount;

            return {
              chats,
                totalItem
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new ChatService();
