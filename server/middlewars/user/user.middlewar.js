import logger from '#config/logger.config';
import { ADMIN } from "#constants/project.constants";
import { BadRequest, Forbidden } from '#constants/responseCodes.enum';
import { ErrorHandler } from "#helpers/error.handler";
import registrRepository from '#repositories/auth/registr.repository';
import userRepository from '#repositories/user/user.repository';
import userValidator from '#validators/userData.validator';

class UserMiddlewar {
        async checkRole(req, res, next) {
        try {
            const { userId } = req;
            let user = await userRepository.getUserById(userId);
            user = user.toJSON();

            let role = await registrRepository.getRoleById(user.role_id);
            role = role.toJSON();

            req.role = role.title;
            next();
        } catch (e) {
            logger.error(e);
            res.status(e.status).json(e.message);
        }
    };

    async checkUpdatedUserData(req, res, next) {
        try {
            const { error } = await userValidator.updateUserData.validate(req.body);

            if (error) {
                throw new ErrorHandler(BadRequest, error);
            }
            next();
        } catch (e) {
            logger.error(e.errors);
            res.status(BadRequest).json(e.errors);
        }
    };

    async checkIsAdmin(req, res, next) {
        try {
            const { userId } = req;

            let user = await userRepository.getUserById(userId);
            user = user.toJSON();

            let role = await registrRepository.getRoleById(user.role_id);
            role = role.toJSON();

            if (role.title !== ADMIN) {
                throw new ErrorHandler(Forbidden, 'You can not create anything');
            }

            next();
        }  catch (e) {
            logger.error(e);
            res.status(e.status).json(e.message);
        }
    };
}

export default new UserMiddlewar();
