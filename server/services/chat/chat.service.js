import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import chatRepository from '#repositories/chat/chat.repository';
import userRepository from '#repositories/user/user.repository';

class ChatService {
    async getAllChats(params, userId) {
        try {
            let {
                limit,
                offset
            } = params;
            offset = (offset - 1) * limit;

            const res = await chatRepository.getAllChatsByUserId(userId, limit, offset);
            const chats = res.toJSON();
            const totalItem = res.pagination.rowCount;

            for (const chat of chats) {
                let user = await userRepository.getUserById(chat.from);
                user = user.toJSON();
                chat.from = user;

                user = await userRepository.getUserById(chat.to);
                user = user.toJSON();
                chat.to = user;

                let message = await chatRepository.getLastMessageByChatId(chat.id);
                message = message.toJSON();
                chat.message = message.message;
            }      

            return {
                chats,
                totalItem
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createChat(toUserId, fromUserId) {
        try {
            let chat = await chatRepository.getOneChatWithoutError(fromUserId, toUserId);

            if (chat) {
                return chat;
            }

            chat = await chatRepository.createChat(fromUserId, toUserId);
            chat = chat.toJSON();

            await chatRepository.createMessage(fromUserId, toUserId, chat.id, '');

            return chat;
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new ChatService();
