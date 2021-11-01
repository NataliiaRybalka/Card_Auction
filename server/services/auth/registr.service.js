import logger from '#config/logger.config';
import { ADMIN, USER } from '#constants/project.constants';
import { ErrorHandler } from '#helpers/error.handler';
import { hashPassword } from '#helpers/passwordHasher';
import registrRepository from '#repositories/auth/registr.repository';
import userRepository from '#repositories/user/user.repository';
import tokenService from './tokens.service';

class RegistrService {
    async createUser(userData) {
        try {
            const { login, email, password } = userData;
            const hashedPassword = await hashPassword(password);

            let roles = await registrRepository.getRoles();
            roles = roles.toJSON();
            let arrayUsers = await userRepository.getUsers();
            arrayUsers = arrayUsers.toJSON();

            if (!arrayUsers.length) {
                await registrRepository.createUser(login, email, hashedPassword, roles.find(role => role.title === ADMIN).id);
            } else {
                await registrRepository.createUser(login, email, hashedPassword, roles.find(role => role.title === USER).id);
            }

            const user = await userRepository.getUserByEmail(email);

            await tokenService.createTokens(user.id);
            const userTokens = await tokenService.getTokens(user.id);

            return {
                user,
                userTokens
            };
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    }
}

export default new RegistrService();
