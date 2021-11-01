import { UserToken } from '#models/UserToken';

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
            console.log(e);
        }
    };

    async getTokenByUserId(user_id) {
        try {
            return await UserToken.where({ user_id }).orderBy('user_id', 'DESC').fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async getTokenByAT(access_token) {
        try {
            return await UserToken.where({ access_token }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async getTokenByRT(refresh_token) {
        try {
            return await UserToken.where({ refresh_token }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async deleteTokens(user_id) {
        try {
            return await UserToken.where({ user_id }).destroy();
        } catch (e) {
            console.log(e);
        }
    };
}

export default new TokenRepository();
