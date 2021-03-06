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

    async getAllChatsByUserIdWithoutPagination(userId) {
        try {
            return await ChatList.query(qb => {
                qb.where({ from: userId }),
                qb.orWhere({ to: userId })
            }).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getLastMessageByChatId(chat_id) {
        try {
            return await Chat.where({ chat_id }).query(qb => qb.orderBy('created_at', 'DESC')).fetch({ columns: ['message', 'created_at'] });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getOneChatWithoutError(from, to) {
        try {
            return await ChatList.query(qb => {
                qb.where({ from: from, to: to }),
                qb.orWhere({ from: to, to: from })
            }).fetch();
        } catch (e) {
            logger.error(e);
        }
    };

    async createChat(from, to) {
        try {
            return await ChatList.forge({ from, to }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async createMessage(from, to, chat_id, message) {
        try {
            return await Chat.forge({ from, to, chat_id, message, created_at: new Date() }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getChat(chat_id) {
        try {
            return await Chat.where({ chat_id }).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async deleteByUserId(user_id) {
        try {
            await Chat.query(qb => {
                qb.where({ from: user_id }),
                qb.orWhere({ to: user_id })
            }).destroy();

            await ChatList.query(qb => {
                qb.where({ from: user_id }),
                qb.orWhere({ to: user_id })
            }).destroy();

            return;
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new ChatRepository();
