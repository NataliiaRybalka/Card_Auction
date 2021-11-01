import logger from '#config/logger.config';
import {  NotFoundMes, NotCreated, NotUpdated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { UserCard } from '#models/UserCard';

class UserCardRepository {
    async soldUserCard(id, price_sold) {
        try {
            return await UserCard.forge({ id }).save({ price_sold, sold_at: new Date() });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotUpdated);
        }
    };

    async createUserCard(user_id, card_id, price_bought) {
        try {
            return await UserCard.forge({ user_id, card_id, price_bought, bought_at: new Date() }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getOneUserCardById(id) {
        try {
            return await UserCard.where({ id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getAllUserCardsPresentByUserId(user_id) {
        try {
            return await UserCard.where({ user_id, sold_at: null }).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getAllUsersCardsPresent() {
        try {
            return await UserCard.where({ sold_at: null }).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new UserCardRepository();
