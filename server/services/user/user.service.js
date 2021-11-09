import logger from '#config/logger.config';
import { ForbiddenMes, ThisUserIsNotRegistered, YouAreNotAdmin } from '#constants/errorMessages.enum';
import { Forbidden, NotFound } from '#constants/responseCodes.enum';
import { ADMIN, USER } from "#constants/project.constants";
import { ErrorHandler } from '#helpers/error.handler';
import registrRepository from "#repositories/auth/registr.repository";
import tokenRepository from "#repositories/auth/token.repository";
import userRepository from '#repositories/user/user.repository';

class UserService {
    async getAllUsers(id) {
        try {
            let users = await userRepository.getUsers();
            users = users.toJSON();

            let roleId;
            users.find(user => {
                if (user.id === id) roleId = user.role_id;
            });
            let role = await registrRepository.getRoleById(roleId);
            role = role.toJSON();

            if (role.title === USER) {
                users = users.filter(user => user.role_id === role.id);
            }

            let roles = await registrRepository.getRoles();
            roles = roles.toJSON();

            users.map(user => {
                user.role_id = roles.find(role => role.id === user.role_id);
            });

            return users;
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async getOneUser(id) {
        try {
            let user = await userRepository.getUserById(id);
            if (!user) {
                throw new ErrorHandler(NotFound, ThisUserIsNotRegistered);
            }
            user = user.toJSON();

            let roleId = user.role_id;
            let role = await registrRepository.getRoleById(roleId);
            role = role.toJSON();
            if (role.title === ADMIN) {
                throw  new ErrorHandler(Forbidden, YouAreNotAdmin);
            }

            user.role_id = role.title;

            return user;
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async updateUserData(id, userData, idFromTokens) {
        try {
            const { login, email, password } = userData;

            if (id  != idFromTokens) {
                throw new ErrorHandler(Forbidden, ForbiddenMes);
            }
            await userRepository.updateUserData(id, login, email, password);
            return await userRepository.getUserById(id);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
            };

    async updateUserRating(id, rating) {
        try {
            return await userRepository.updateUserRating(id, rating);
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async updateUserRole(userId, newUserRole) {
        try {
            let role = await registrRepository.getRoleByTitle(newUserRole);
            role = role.toJSON();

            return await userRepository.updateUserRole(userId, role.id);
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    }

    async deleteUser(id, idFromTokens) {
        try {
            if (Number(id) !== idFromTokens) {
                throw new ErrorHandler(Forbidden, ForbiddenMes);
            }

            await tokenRepository.deleteTokens(id);
            return await userRepository.deleteUser(id);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new UserService();
