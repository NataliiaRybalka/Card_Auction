import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';

import logger from '#config/logger.config';
import { WrongEmailOrPassword } from '#constants/errorMessages.enum';
import { USER } from '#constants/project.constants';
import { Unauthorized } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { comparePassword } from '#helpers/passwordHasher';
import registrRepository from "#repositories/auth/registr.repository";
import userRepository from '#repositories/user/user.repository';
import tokenService from './tokens.service';

class LoginService {
    async loginUser(userData) {
        try {
            let user;
            let name;
            let email;

            if (userData.tokenId || userData.accessToken) {
                if (userData.tokenId) {
                    const client = new OAuth2Client(process.env.CLIENT_ID);
                    const { tokenId } = userData;
        
                    const res = await client.verifyIdToken({
                        idToken: tokenId,
                        audience: process.env.CLIENT_ID
                    });
        
                    const { email_verified } = res.payload;
                    email = res.payload.email;
                    name = res.payload.name;

                    if (email_verified) {
                        user = await userRepository.getUsersByEmailWithoutError(email);
                    }
                } else if (userData.accessToken) {
                    const { accessToken, userID } = userData;
                    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
                    const res = await fetch(urlGraphFacebook, {
                        method: 'GET'
                    });
                    const data = await res.json();
                    email = data.email;
                    name = data.name;

                    user = await userRepository.getUsersByEmailWithoutError(email);
                }      

                if (user) {
                    user = user.toJSON();
                } else {
                    let roles = await registrRepository.getRoles();
                    roles = roles.toJSON();

                    await registrRepository.createUser(name, email, email, roles.find(role => role.title === USER).id);

                    user = await userRepository.getUserByEmail(email);
                    user = user.toJSON();
                }
            } else {
                const { email, password } = userData;
                user = await userRepository.getUserByEmail(email);
                user = user.toJSON();

                const isCompared = await comparePassword(password, user.password);
                if (!isCompared) {
                    throw  new ErrorHandler(Unauthorized, WrongEmailOrPassword);
                }
            }

            await tokenService.createTokens(user.id);
            let userTokens = await tokenService.getTokens(user.id);
            userTokens = userTokens.toJSON();

            let roleId = user.role_id;
            let role = await registrRepository.getRoleById(roleId);
            role = role.toJSON();
            user.role_id = role.title;

            return {
                user,
                userTokens: userTokens[userTokens.length - 1]
            };
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
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
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new LoginService();
