import logger from '#config/logger.config';
import { NotCreated, NotFoundMes } from '#constants/errorMessages.enum';
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { Role } from '#models/Role';
import { User } from '#models/User';
import { ErrorHandler } from '#helpers/error.handler';

class RegistrRepository {
    async getRoles() {
        try {
            return await Role.fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getRoleById(id) {
        try {
            return await Role.where({ id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getRoleByTitle(title) {
        try {
            return await Role.where({ title }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async createUser(login, email, password, role_id) {
        try {
            return await User.forge({
                login,
                email,
                password,
                role_id,
                created_at: new Date()
            }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    }
}

export default new RegistrRepository();
