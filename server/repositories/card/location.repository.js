import logger from '#config/logger.config';
import { NotFoundMes, NotCreated } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { Location } from "#models/Location";

class LocationRepository {
    async createLocation(title, type) {
        try {
            return await Location.forge({ title, type }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getOneLocationByTitle(title) {
        try {
            return await Location.where({ title }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async checkIsLocationPresent(title) {
        try {
            return await Location.where({ title }).fetch();
        } catch (e) {
            logger.error(e);
        }
    };
}

export default new LocationRepository();