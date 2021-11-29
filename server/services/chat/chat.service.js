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

    async getChat(toUserId, fromUserId) {
        try {
            let chatFromChatList = await chatRepository.getOneChatWithoutError(fromUserId, toUserId);

            if (chatFromChatList) {
                return await chatRepository.getChat(chatFromChatList.id);
            }

            chatFromChatList = await chatRepository.createChat(fromUserId, toUserId);
            chatFromChatList = chatFromChatList.toJSON();

            return await chatRepository.createMessage(fromUserId, toUserId, chatFromChatList.id, '');
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new ChatService();
