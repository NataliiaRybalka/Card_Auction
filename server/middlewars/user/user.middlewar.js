import { ADMIN } from "#constants/project.constants";
import { BadRequest, Forbidden } from '#constants/responseCodes.enum';
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
            next(e);
        }
    };

    async checkUpdatedUserData(req, res, next) {
        try {
            const { error } = await userValidator.updateUserData.validate(req.body);

            if (error) {
                throw new Error(error);
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(BadRequest));
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
                throw new Error('You can not create anything');
            }

            next();
        }  catch (e) {
            console.log(e);
            next(res.sendStatus(Forbidden));
        }
    };
}

export default new UserMiddlewar();
