import { OK, Created } from '#constants/responseCodes.enum';
import cardService from '#services/card/card.service';

class CardController {
    async getAllCards(req, res, next) {
        try {
        const {role, userId} = req;
        const cards = await cardService.getAllCards();
        let userCards = await cardService.getAllUserCards(role, userId);

        return res.status(OK).json({ cards, userCards });
        } catch (e) {
        next(e);
        }
    };

    async createCard(req, res, next) {
        try {
        const { cardData } = req.body;
        return res.status(Created).json(await cardService.createCard(cardData));
        } catch (e) {
        next(e);
        }
    };

    async getUserCardsInStock(req, res, next) {
        try {
        const { role, userId } = req;
        res.status(OK).json(await cardService.getAllUserCards(role, userId));
        }  catch (e) {
        next(e);
        }
    };
}

export default new CardController();
