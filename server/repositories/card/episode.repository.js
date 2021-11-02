import logger from '#config/logger.config';
import { NotFoundMes, NotCreated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { Episode } from "#models/Episode";

class EpisodeRepository {
    async createEpisode(title, air_date, series) {
        try {
            return await Episode.forge({ title, air_date, series }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getOneEpisodeByTitle(title) {
        try {
            return await Episode.where({ title }).fetch();
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async checkIsEpisodePresent(title) {
        try {
            return await Episode.where({ title }).fetch();
        }  catch (e) {
            logger.error(e);
        }
    };
}

export default new EpisodeRepository();
