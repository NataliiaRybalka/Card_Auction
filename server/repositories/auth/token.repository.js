import logger from '#config/logger.config';
import { BadRequestMes, NotFoundMes, NotCreated } from '#constants/errorMessages.enum';
import { BadRequest, InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { UserToken } from '#models/UserToken';
import { ErrorHandler } from '#helpers/error.handler';

class TokenRepository {
    async createTokens(user_id, access_token, refresh_token) {
        try {
            return await UserToken.forge({
                user_id,
                access_token,
                refresh_token: refresh_token.refresh_token,
                expiresIn: refresh_token.expiresIn,
                created_at: new Date()
            }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getTokens() {
        try {
            return await UserToken.fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getTokenByUserId(user_id) {
        try {
            return await UserToken.where({ user_id }).orderBy('user_id', 'DESC').fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getTokenByAT(access_token) {
        try {
            return await UserToken.where({ access_token }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getTokenByRT(refresh_token) {
        try {
            return await UserToken.where({ refresh_token }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async deleteTokens(id) {
        try {
            return await UserToken.where({ id }).destroy();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(BadRequest, BadRequestMes);
        }
    };

    async deleteTokensByUserId(user_id) {
        try {
            return await UserToken.where({ user_id }).destroy();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(BadRequest, BadRequestMes);
        }
    };
}

export default new TokenRepository();
