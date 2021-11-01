import { BadRequest } from '#constants/responseCodes.enum';
import cardValidator from '#validators/cardData.validator';
import cardRepository from "#repositories/card/card.repository";

class CardMiddlewar {
    async checkCardDataValidity(req, res, next) {
        try {
            const { error } = await cardValidator.createCardData.validate(req.body);

            if (error) {
                throw new Error(error);
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(BadRequest));
        }
    };

    async checkIsCardBeenAdd(req, res, next) {
        try {
            const { name } = req.body;

            const card = await cardRepository.getOneCardByName(name);

            if (card) {
                throw new Error('This card has already added');
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(BadRequest));
        }
    };
}

export default new CardMiddlewar();
