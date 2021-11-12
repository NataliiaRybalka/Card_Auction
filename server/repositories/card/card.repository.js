import logger from '#config/logger.config';
import { NotFoundMes, NotCreated, NotUpdated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { Card } from '#models/Card';

class CardRepository {
    async getAllCards() {
        try {
            return await Card.query(qb => qb.orderBy('created_at', 'DESC')).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getAllUserCards(user_id) {
        try {
            return await UserCard.where({ user_id }).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getOneCardById(id) {
        try {
            return await Card.where({ id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getNameAndImageOneCardById(id) {
        try {
            return await Card.where({ id }).fetch({ columns: ['id', 'name', 'image'] });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async createCard(name, is_alive, species, gender, location_id) {
        try {
            return await Card.forge({
                name,
                is_alive,
                species,
                gender,
                location_id,
                created_at: new Date()
            }).save();
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async addImageForCard(id, image) {
        try {
            return await Card.forge({ id }).save({ image });
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getOneCardByName(name) {
        try {
            return await Card.where({ name }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async checkIsCardCreatedAlready(name) {
        try {
            return await Card.where({ name }).fetch();
        } catch (e) {
            logger.error(e);
        }
    };

    async updateTimesSold(id, times_sold) {
        try {
            return await Card.forge({ id }).save({ times_sold });
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotUpdated);
        }
    };
}

export default new CardRepository();
