import { OK, Created, NoContent } from '#constants/responseCodes.enum';
import userService from '#services/user/user.service';

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const { userId } = req;
            res.status(OK).json(await userService.getAllUsers(userId, req.query));
        } catch (e) {
            next(e);
        }
    };

    async getOneUser(req, res, next) {
        try {
            res.status(OK).json(await userService.getOneUser(req.params.userId));
        } catch (e) {
            next(e);
        }
    };

    async updateUserData(req, res, next) {
        try {
            const {
                params: { userId: id },
                body: userData,
                userId: idFromTokens,
                photo
            } = req;
            res.status(Created).json(await userService.updateUserData(id, userData, idFromTokens, photo));
        } catch (e) {
            next(e);
        }
    };

    async updateUserRole(req, res, next) {
        try {
            res.status(Created).json(await userService.updateUserRole(req.params.userId, req.body.newRole));
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const {
                params: { userId: id },
                userId: idFromTokens
            } = req;
            await userService.deleteUser(id, idFromTokens);

            res.status(NoContent).json('Ok');
        } catch (e) {
            next(e);
        }
    };

    async getTotalUsers(req, res, next) {
        try {
            res.status(OK).json(await userService.getTotalUsers());
        } catch (e) {
            next(e);
        }
    };
}

export default new UserController();
