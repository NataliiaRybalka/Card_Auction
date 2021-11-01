import { ADMIN, USER } from '#constants/project.constants';
import { hashPassword } from '#helpers/passwordHasher';
import tokenService from './tokens.service';
import registrRepository from '#repositories/auth/registr.repository';
import userRepository from '#repositories/user/user.repository';

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
            console.log(e);
        }
    }
}

export default new RegistrService();
