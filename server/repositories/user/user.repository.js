import logger from '#config/logger.config';
import { BadRequestMes, NotFoundMes, NotUpdated} from '#constants/errorMessages.enum';
import { BadRequest, InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { User } from '#models/User';

class UserRepository {
    async getUsers() {
        try {
            return await User.query(qb => qb.orderBy('rating', 'DESC')).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getUsersByEmail(email) {
        try {
            return await User.where({ email }).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getUserByEmail(email) {
        try {
            return await User.where({ email }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async checkIsUserPresent(email) {
        try {
            return await User.where({ email }).fetch();
        } catch (e) {
            logger.error(e);
        }
    };

    async getUserById(id) {
        try {
            return await User.where({ id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getUserLoginById(id) {
        try {
            return await User.where({ id }).fetch({ columns: ['id', 'login'] });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async updateUserData(id, login, email, password, role) {
        try {
            return await User.forge({ id }).save({ login, email, password, role });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotUpdated);
        }
    };

    async updateUserRating(id, rating) {
        try {
            return await User.forge({ id }).save({ rating });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotUpdated);
        }
    };

    async updateUserRole(id, role_id) {
        try {
            return await User.forge({ id }).save({ role_id });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotUpdated);
        }
    }

    async deleteUser(id) {
        try {
            return await User.where({ id }).destroy();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(BadRequest, BadRequestMes);
        }
    }
}

export default new UserRepository();
