import { Unauthorized} from '#constants/responseCodes.enum';
import userRepository from '#repositories/user/user.repository';
import registrRepository from '#repositories/auth/registr.repository';

class LoginMiddlewar {
    async checkIsEmailCorrect(req, res, next) {
        try {
            const { email } = req.body;

            const user = await userRepository.getUserByEmail(email);
            if (!user) {
                throw new Error('Wrong email or password');
            }

            req.user = user;
            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(Unauthorized));
        }
    };

    async checkRole(req, res, next) {
        try {
            const { roleId } = req.user;
            req.role = await registrRepository.getRoleById(roleId);

            next();
        } catch (e) {
            next(e);
        }
    };
}

export default new LoginMiddlewar();
