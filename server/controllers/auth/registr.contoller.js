import { Created } from '#constants/responseCodes.enum';
import registrService from '#services/auth/registr.service';

class RegistrContoller {
    async createUser(req, res, next) {
        try {
            res.status(Created).json(await registrService.createUser(req.body));
        } catch (e) {
            next(e);
        }
    };

    async verifyUser(req, res, next) {
        try {
            await registrService.verifyUser(req.params)
            res.status(Created).json(Created);
        } catch (e) {
            next(e);
        }
    };
}

export default new RegistrContoller();
