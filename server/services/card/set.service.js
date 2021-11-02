import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import setRepository from "#repositories/card/set.repository";

class SetService {
    async createSet(title, bonus) {
        try {
            return await setRepository.createSet(title, bonus);
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new SetService();
