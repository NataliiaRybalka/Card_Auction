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
            const chatsFrom = res.chatsFrom.toJSON();
            const totalItemFrom = res.chatsFrom.pagination.rowCount;
            const chatsTo = res.chatsTo.toJSON();
            const totalItemTo = res.chatsTo.pagination.rowCount;

            const chats = [];
            const totalItem = totalItemFrom + totalItemTo;

            for (const chat of chatsFrom) {
                let user = await userRepository.getUserById(chat.from);
                user = user.toJSON();
                chat.from = user;

                user = await userRepository.getUserById(chat.to);
                user = user.toJSON();
                chat.to = user;

                chats.push(chat);
            }

            for (const chat of chatsTo) {
                let user = await userRepository.getUserById(chat.from);
                user = user.toJSON();
                chat.from = user;

                user = await userRepository.getUserById(chat.to);
                user = user.toJSON();
                chat.to = user;

                chats.push(chat);
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
}

export default new ChatService();
