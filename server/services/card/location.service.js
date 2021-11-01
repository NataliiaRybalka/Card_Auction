import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import locationRepository from '#repositories/card/location.repository';

class LocationService {
    async createLocation(locationTitle, locationType) {
        try {
            let location = await locationRepository.checkIsLocationPresent(locationTitle);
            if (!location) {
                location = await locationRepository.createLocation(locationTitle, locationType);
                location = await locationRepository.getOneLocationByTitle(locationTitle);
            }

            return location.toJSON();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new LocationService();