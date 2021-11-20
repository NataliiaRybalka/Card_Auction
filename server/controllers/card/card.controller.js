import { OK, Created } from '#constants/responseCodes.enum';
import cardService from '#services/card/card.service';

class CardController {
    async getAllCards(req, res, next) {
        try {
            const {role, userId} = req;
            const cards = await cardService.getAllCards(req.query);
            let userCards = await cardService.getAllUserCards(role, userId);

            return res.status(OK).json({ cards, userCards });
        } catch (e) {
            next(e);
        }
    };

    async createCard(req, res, next) {
        try {
            return res.status(Created).json(await cardService.createCard(req.body, req.photo));
        } catch (e) {
            next(e);
        }
    };

    async getUserCardsInStock(req, res, next) {
        try {
            const { role, userId, query } = req;
            res.status(OK).json(await cardService.getAllUserCards(role, userId, query));
        }  catch (e) {
            next(e);
        }
    };
}

export default new CardController();
