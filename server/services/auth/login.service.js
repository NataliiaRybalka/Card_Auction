import { comparePassword } from '#helpers/passwordHasher';
import tokenService from './tokens.service';
import userRepository from '#repositories/user/user.repository';

class LoginService {
    async loginUser(userData) {
        try {
            const { email, password } = userData;
            const user = await userRepository.getUserByEmail(email);

            const isCompared = await comparePassword(password, user.attributes.password);
            if (!isCompared) {
                throw  new Error('Wrong email or password');
            }

            await tokenService.createTokens(user.id);
            let userTokens = await tokenService.getTokens(user.id);
            userTokens = userTokens.toJSON();

            return {
                user,
                userTokens: userTokens[userTokens.length - 1]
            };
        } catch (e) {
            console.log(e);
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
            console.log(e);
        }
    }
}

export default new LoginService();
