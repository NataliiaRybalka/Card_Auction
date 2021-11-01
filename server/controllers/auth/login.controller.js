import { OK, Created } from '#constants/responseCodes.enum';
import loginService from '#services/auth/login.service';

class LoginController {
    async loginUser(req, res, next) {
        try {
            res.status(OK).json(await loginService.loginUser(req.body));
        } catch (e) {
            next(e);
        }
    };

    async createNewTokenPair(req, res, next) {
        try {
            res.status(Created).json(await loginService.createNewTokenPair(req.userId));
        } catch (e) {
            next(e);
        }
    }
}

export default new LoginController();
