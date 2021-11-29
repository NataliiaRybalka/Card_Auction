import logger from '#config/logger.config';
import { AUTHORIZATION, REFRESH_TOKEN } from '#constants/project.constants';
import { ErrorHandler } from "#helpers/error.handler";
import { Unauthorized } from '#constants/responseCodes.enum';
import { verifyToken } from '#helpers/token.helper';
import tokenRepository from '#repositories/auth/token.repository';

class TokenMiddlewar {
    async checkAccessToken(req, res, next) {
        try {
            const token = req.get(AUTHORIZATION);

            await verifyToken(token);

            let userTokens = await tokenRepository.getTokenByAT(token);
            userTokens = userTokens.toJSON();
            if (!userTokens) {
                throw new ErrorHandler(Unauthorized, 'Wrong token');
            }

            req.userId = userTokens.user_id;
            req.tokenId = userTokens.id;

            next();
        } catch (e) {
            logger.error(e);
            res.status(Unauthorized).json('Wrong token');
        }
    };

    async checkRefreshToken(req, res, next) {
        try {
            const token = req.get(REFRESH_TOKEN);

            let userTokens = await tokenRepository.getTokenByRT(token);
            userTokens = userTokens.toJSON();

            const { expiresIn,  created_at } = userTokens;
            if (!userTokens || ((expiresIn + created_at) < Date.now())) {
                throw new ErrorHandler(Unauthorized, 'Wrong token');
            }

            req.userId = userTokens.user_id;
            req.tokenId = userTokens.id;

            next();
        } catch (e) {
            logger.error(e);
            res.status(Unauthorized).json('Wrong token');
        }
    };
}

export default new TokenMiddlewar();
