import logger from '#config/logger.config';
import { NotFoundMes, NotCreated, NotUpdated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { ChatList } from '#models/ChatList';
import { Chat } from '#models/Chat';

class ChatRepository {
    async getAllChatsByUserId(userId, limit, offset) {
        try {
            return await ChatList.query(qb => {
                qb.where({ from: userId }),
                qb.orWhere({ to: userId })
            }).fetchPage({ offset, limit });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getLastMessageByChatId(chat_id) {
        try {
            return await Chat.where({ chat_id }).query(qb => qb.orderBy('created_at', 'DESC')).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new ChatRepository();
