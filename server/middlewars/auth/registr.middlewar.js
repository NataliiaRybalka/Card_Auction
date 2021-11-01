import { BadRequest, Unauthorized } from '#constants/responseCodes.enum';
import userRepository from '#repositories/user/user.repository';
import userValidator from '#validators/userData.validator';

class RegistrMiddlewar {
    async checkDataValidity(req, res, next) {
        try {
            const { error } = await userValidator.createUserData.validate(req.body);

            if (error) {
                throw new Error(error);
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(BadRequest));
        }
    };

    async checkIsEmailBusy(req, res, next) {
        try {
            const { email } = req.body;

            const user = await userRepository.getUsersByEmail(email);

            if (user) {
                throw new Error('This email has already registered');
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(Unauthorized));
        }
    };
}

export default new RegistrMiddlewar();
