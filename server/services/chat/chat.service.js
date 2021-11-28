import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import chatRepository from '#repositories/chat/chat.repository';
import userRepository from '#repositories/user/user.repository';
import e from 'cors';

class ChatService {
    async getAllChats(params, userId) {
        try {
            let {
                limit,
                offset
            } = params;
            offset = (offset - 1) * limit;

            const res = await chatRepository.getAllChatsByUserId(userId, limit, offset);
            const chats= res.toJSON();
            const totalItem= res.pagination.rowCount;

            for (const chat of chats) {
                let user = await userRepository.getUserById(chat.from);
                user = user.toJSON();
                chat.from = user;

                user = await userRepository.getUserById(chat.to);
                user = user.toJSON();
                chat.to = user;
            }      

            const emails = [];
            const filteredChats = [];
            chats.forEach((chat, i) => {
                if (i === 0) {
                    filteredChats.push(chat);
                    if (chat.from.id !== userId) {
                        emails.push(chat.from.email);
                    }
                    if (chat.to.id !== userId) {
                        emails.push(chat.to.email);
                    }
                } else {
                    if (!emails.includes(chat.from.email) && !emails.includes(chat.to.email)) {
                        filteredChats.push(chat);
                        if (chat.from.id !== userId) {
                            emails.push(chat.from.email);
                        }
                        if (chat.to.id !== userId) {
                            emails.push(chat.to.email);
                        }
                    }
                }
            })

            return {
                chats: filteredChats,
                totalItem
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new ChatService();
