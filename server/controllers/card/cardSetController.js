import { OK, Created } from '#constants/responseCodes.enum';
import cardSetService from "#services/card/cardSet.service";

class CardSetController {
    async getAllCardSets(req, res, next) {
        try {
            res.status(OK).json(await cardSetService.getAllCardSets(req.query));
        } catch (e) {
            next(e);
        }
    };

    async createCardSet(req, res, next) {
        try {
            res.status(Created).json(await cardSetService.createCardSet(req.body));
        } catch (e) {
            next(e);
        }
    };
}

export default new CardSetController();
