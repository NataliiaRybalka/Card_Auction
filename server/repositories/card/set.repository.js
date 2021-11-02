import logger from '#config/logger.config';
import { NotFoundMes, NotCreated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { Set } from "#models/Set";

class SetRepository {
    async createSet(title, bonus) {
        try {
            return await Set.forge({ title, bonus }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getOneSetById(id) {
        try {
            return await Set.where({ id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getAllSets() {
        try {
            return await Set.fetchAll({
                withRelated: ['card_set']
            });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new SetRepository();
