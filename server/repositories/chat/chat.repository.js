import logger from '#config/logger.config';
import { NotFoundMes, NotCreated, NotUpdated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { Chat } from '#models/Chat';

class ChatRepository {
    async getAllChatsByUserId(userId, limit, offset) {
        try {
            const chatsFrom = await Chat.where({ from: userId }).query(qb => qb.orderBy('created_at', 'DESC')).fetchPage({ offset, limit });
            const chatsTo = await Chat.where({ to: userId }).query(qb => qb.orderBy('created_at', 'DESC')).fetchPage({ offset, limit });
            return {
                chatsFrom,
                chatsTo
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new ChatRepository();
