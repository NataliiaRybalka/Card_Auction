import logger from '#config/logger.config';
import { NotFoundMes, NotCreated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { CardSet } from "#models/CardSet";

class CardSetRepository {
    async getAllCardSets() {
        try {
            return await CardSet.fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async createCardSet(card_id, set_id) {
        try {
            return await CardSet.forge({ card_id, set_id }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getOneCardSetByCardId(card_id) {
        try {
            return await CardSet.where({ card_id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new CardSetRepository();
