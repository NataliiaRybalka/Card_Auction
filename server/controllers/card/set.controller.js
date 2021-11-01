import { Created } from '#constants/responseCodes.enum';
import setService from "#services/card/set.service";

class SetController {
    async createSet(req, res, next) {
        try {
        const { title, bonus } = req.body;
        res.status(Created).json(await setService.createSet(title, bonus));
        } catch (e) {
        next(e);
        }
    };
}

export default new SetController();
