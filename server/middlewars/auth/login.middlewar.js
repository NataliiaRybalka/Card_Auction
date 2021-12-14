import logger from '#config/logger.config';
import { Unauthorized} from '#constants/responseCodes.enum';
import { ErrorHandler } from "#helpers/error.handler";
import registrRepository from '#repositories/auth/registr.repository';
import userRepository from '#repositories/user/user.repository';

class LoginMiddlewar {
    async checkIsEmailCorrect(req, res, next) {
        try {
            const { email } = req.body;

            let user = await userRepository.getUserByEmail(email);
            user = user.toJSON();
            if (!user) {
                throw new ErrorHandler(Unauthorized, 'Wrong email or password');
            }

            req.user = user;
            next();
        } catch (e) {
            logger.error('Wrong email or password', e);
            res.status(Unauthorized).json('Wrong email or password');
        }
    };

    async checkIsEmailConfirmed(req, res, next) {
        try {
            if (!req.user.is_active) {
                throw new ErrorHandler(Unauthorized, 'Please confirm your email');
            }

            next();
        } catch (e) {
            logger.error('Wrong email or password', e);
            res.status(Unauthorized).json('Please confirm your email');
        }
    };

    async checkRole(req, res, next) {
        try {
            const { role_id } = req.user;
            req.role = await registrRepository.getRoleById(role_id);

            next();
        } catch (e) {
            logger.error(e);
            res.status(e.status).json(e.message);
        }
    };
}

export default new LoginMiddlewar();
