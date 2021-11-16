import logger from '#config/logger.config';
import { WrongEmailOrPassword } from '#constants/errorMessages.enum';
import { Unauthorized } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { comparePassword } from '#helpers/passwordHasher';
import registrRepository from "#repositories/auth/registr.repository";
import userRepository from '#repositories/user/user.repository';
import tokenService from './tokens.service';

class LoginService {
    async loginUser(userData) {
        try {
            const { email, password } = userData;
            let user = await userRepository.getUserByEmail(email);
            user = user.toJSON();

            const isCompared = await comparePassword(password, user.password);
            if (!isCompared) {
                throw  new ErrorHandler(Unauthorized, WrongEmailOrPassword);
            }

            await tokenService.createTokens(user.id);
            let userTokens = await tokenService.getTokens(user.id);
            userTokens = userTokens.toJSON();

            let roleId = user.role_id;
            let role = await registrRepository.getRoleById(roleId);
            role = role.toJSON();
            user.role_id = role.title;

            return {
                user,
                userTokens: userTokens[userTokens.length - 1]
            };
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createNewTokenPair(userId) {
        try {
            await tokenService.createTokens(userId);
            let userTokens = await tokenService.getTokens(userId);
            userTokens = userTokens.toJSON();

            const user = await userRepository.getUserById(userId);

            return {
                user,
                userTokens: userTokens[userTokens.length - 1]
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new LoginService();
