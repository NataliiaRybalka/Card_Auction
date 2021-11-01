import { generateTokenPair } from '#helpers/token.helper';
import tokenRepository from '#repositories/auth/token.repository';

class TokensService {
    async createTokens(userId) {
        try {
            const {accessToken, refreshToken} = await generateTokenPair(userId);
            return await tokenRepository.createTokens(userId, accessToken, refreshToken);
        } catch (e) {
            console.log(e);
        }
    };

    async getTokens(userId) {
        try {
            return await tokenRepository.getTokenByUserId(userId);
        } catch (e) {
            console.log(e);
        }
    };
}

export default new TokensService();
