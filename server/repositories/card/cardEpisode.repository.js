import logger from '#config/logger.config';
import { NotCreated } from '#constants/errorMessages.enum';
import { InternalServerError } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { CardEpisode } from "#models/CardEpisode";

class CardEpisodeRepository {
    async createCardEpisode(card_id, episode_id) {
        try {
            return await CardEpisode.forge({ card_id, episode_id }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getCardEpisodeByCardId(card_id) {
        try {
            return await CardEpisode.where({ card_id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };
}

export default new CardEpisodeRepository();
