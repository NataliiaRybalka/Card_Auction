import logger from '#config/logger.config';
import { NotFoundMes, NotCreated, NotUpdated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { Chat } from '#models/Chat';

class ChatRepository {
    async getAllChats(limit, offset) {
        try {
            return await Chat.query(qb => qb.orderBy('created_at', 'DESC')).fetchPage({ offset, limit });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new ChatRepository();
