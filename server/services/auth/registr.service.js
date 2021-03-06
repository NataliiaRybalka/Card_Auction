import logger from '#config/logger.config';
import { LINK_FOR_CONFIRM_EMAIL, PORT_CLIENT } from '#constants/env.constants';
import { EMAIL_CONFIRM } from '#constants/mailActions.constants';
import { ADMIN, USER } from '#constants/project.constants';
import { ErrorHandler } from '#helpers/error.handler';
import { hashPassword } from '#helpers/passwordHasher';
import registrRepository from '#repositories/auth/registr.repository';
import userRepository from '#repositories/user/user.repository';
import { sendMail } from './mail.service';
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
                await registrRepository.createUser(login, email, hashedPassword, roles.find(role => role.title === ADMIN).id, false);
            } else {
                await registrRepository.createUser(login, email, hashedPassword, roles.find(role => role.title === USER).id, false);
            }

            let user = await userRepository.getUserByEmail(email);
            user = user.toJSON();

            await tokenService.createTokens(user.id);
            const userTokens = await tokenService.getTokens(user.id);

            let roleId = user.role_id;
            let role = await registrRepository.getRoleById(roleId);
            role = role.toJSON();
            user.role_id = role.title;

            await sendMail(email, EMAIL_CONFIRM, { login, verifyLink: `http://localhost:${PORT_CLIENT}/account/${user.id}${LINK_FOR_CONFIRM_EMAIL}` });

            return {
                user,
                userTokens
            };
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async verifyUser(userId) {
        try {
            return await registrRepository.verifyUser(userId.userId);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new RegistrService();
