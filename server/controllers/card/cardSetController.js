import { OK, Created } from '#constants/responseCodes.enum';
import cardSetService from "#services/card/cardSet.service";

class CardSetController {
    async getAllCardSets(req, res, next) {
        try {
        res.status(OK).json(await cardSetService.getAllCardSets());
        } catch (e) {
        next(e);
        }
    };

    async createCardSet(req, res, next) {
        try {
        const { cardId, setId } = req.body;
        res.status(Created).json(await cardSetService.createCardSet(cardId, setId));
        } catch (e) {
        next(e);
        }
    };
}

export default new CardSetController();
