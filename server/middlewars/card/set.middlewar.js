import logger from '#config/logger.config';
import { BadRequest } from '#constants/responseCodes.enum';
import { ErrorHandler } from "#helpers/error.handler";
import setVlidator from '#validators/setData.validator';

class SetMiddlewar {
    async checkSetDataValidity(req, res, next) {
        try {
            const { error } = await setVlidator.createSetData.validate(req.body);

            if (error) {
                throw new ErrorHandler(BadRequest, error);
            }

            next();
        } catch (e) {
            logger.error(e.errors);
            res.status(e.status).json(e.message);
        }
    };
}

export default new SetMiddlewar();
