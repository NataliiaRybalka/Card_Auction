import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import { generateTokenPair } from '#helpers/token.helper';
import tokenRepository from '#repositories/auth/token.repository';

class TokensService {
    async createTokens(userId) {
        try {
            const {accessToken, refreshToken} = await generateTokenPair(userId);
            return await tokenRepository.createTokens(userId, accessToken, refreshToken);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async getTokens(userId) {
        try {
            return await tokenRepository.getTokenByUserId(userId);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new TokensService();
