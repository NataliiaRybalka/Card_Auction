import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import userCardRepository from '#repositories/user/userCard.repository';

class UserCardService {
    async getOneUserCardById(id) {
        try {
            let userCard = await userCardRepository.getOneUserCardById(id);
            return userCard.toJSON();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async soldUserCard(cardId, currentPrice) {
        try {
            return await userCardRepository.soldUserCard(cardId, currentPrice);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createUserCard(userId, cardId, currentPrice) {
        try {
            return await userCardRepository.createUserCard(userId, cardId, currentPrice);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new UserCardService();
