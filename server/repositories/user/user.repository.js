import logger from '#config/logger.config';
import { BadRequestMes, NotFoundMes, NotUpdated, NotCreated } from '#constants/errorMessages.enum';
import { BadRequest, InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { ErrorHandler } from '#helpers/error.handler';
import { TotalUsers } from '#models/TotalUsers';
import { User } from '#models/User';

class UserRepository {
    async getUsers(limit, offset) {
        try {
            return await User.query(qb => qb.orderBy('rating', 'DESC')).fetchPage({ offset, limit });
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

    async getUsersByEmailWithoutError(email) {
        try {
            return await User.where({ email }).fetch();
        } catch (e) {
            logger.error(e);
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

    async updateUserData(id, login, email, password, image) {
        try {
            return await User.forge({ id }).save({ login, email, password, image });
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
    };

    async deleteUser(id) {
        try {
            return await User.where({ id }).destroy();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(BadRequest, BadRequestMes);
        }
    };

    async countTotalUsers() {
        try {
            return await User.count();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(BadRequest, BadRequestMes);
        }
    };

    async writeDownTotalUsers(total) {
        try {
            return await TotalUsers.forge({
                total,
                created_at: new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString('en-CA')
            }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getTotalUsers() {
        try {
            return await TotalUsers.fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };
}

export default new UserRepository();
