import logger from '#config/logger.config';
import { WrongEmailOrPassword } from '#constants/errorMessages.enum';
import { Unauthorized } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { comparePassword } from '#helpers/passwordHasher';
import userRepository from '#repositories/user/user.repository';
import tokenService from './tokens.service';

class LoginService {
    async loginUser(userData) {
        try {
            const { email, password } = userData;
            const user = await userRepository.getUserByEmail(email);

            const isCompared = await comparePassword(password, user.attributes.password);
            if (!isCompared) {
                throw  new ErrorHandler(Unauthorized, WrongEmailOrPassword);
            }

            await tokenService.createTokens(user.id);
            let userTokens = await tokenService.getTokens(user.id);
            userTokens = userTokens.toJSON();

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
