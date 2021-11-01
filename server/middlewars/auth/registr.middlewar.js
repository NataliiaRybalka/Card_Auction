import logger from '#config/logger.config';
import { BadRequest, Unauthorized } from '#constants/responseCodes.enum';
import { ErrorHandler } from "#helpers/error.handler";
import userRepository from '#repositories/user/user.repository';
import userValidator from '#validators/userData.validator';

class RegistrMiddlewar {
    async checkDataValidity(req, res, next) {
        try {
            const { error } = await userValidator.createUserData.validate(req.body);

            if (error) {
                throw new ErrorHandler(BadRequest, error);
            }

            next();
        } catch (e) {
            logger.error(e.errors);
            res.status(BadRequest).json(e.errors);
        }
    };

    async checkIsEmailBusy(req, res, next) {
        try {
            const { email } = req.body;

            let user = await userRepository.checkIsUserPresent(email);

            if (user) {
                throw new ErrorHandler(Unauthorized, 'This email has already registered');
            }

            next();
        } catch (e) {
            logger.error(e);
            res.status(e.status).json(e.message);
        }
    };
}

export default new RegistrMiddlewar();
