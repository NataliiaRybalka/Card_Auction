import { AUTHORIZATION, REFRESH_TOKEN } from '#constants/project.constants';
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
                throw  new Error('Wrong access token');
            }

            req.userId = userTokens.user_id;
            req.tokenId = userTokens.id;
            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(Unauthorized));
        }
    };

    async checkRefreshToken(req, res, next) {
        try {
            const token = req.get(REFRESH_TOKEN);

            let userTokens = await tokenRepository.getTokenByRT(token);
            userTokens = userTokens.toJSON();

            const { expiresIn,  created_at } = userTokens;
            if (!userTokens || ((expiresIn + created_at) < Date.now())) {
                throw  new Error('Wrong token');
            }

            req.userId = userTokens.user_id;
            req.tokenId = userTokens.id;
            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(Unauthorized));
        }
    };
}

export default new TokenMiddlewar();
