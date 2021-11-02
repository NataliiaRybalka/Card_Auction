import logger from '#config/logger.config';
import { BadRequest } from '#constants/responseCodes.enum';
import { ErrorHandler } from "#helpers/error.handler";
import cardRepository from "#repositories/card/card.repository";
import cardValidator from '#validators/cardData.validator';

class CardMiddlewar {
    async checkCardDataValidity(req, res, next) {
        try {
            const { error } = await cardValidator.createCardData.validate(req.body);

            if (error) {
                throw new ErrorHandler(BadRequest, error);
            }

            next();
        } catch (e) {
            logger.error(e.errors);
            res.status(BadRequest).json(e.errors);
        }
    };

    async checkIsCardBeenAdd(req, res, next) {
        try {
            const { name } = req.body;

            const card = await cardRepository.checkIsCardCreatedAlready(name);

            if (card) {
                throw new ErrorHandler(BadRequest, 'This card has already added');
            }

            next();
        } catch (e) {
            logger.error(e);
            res.status(e.status).json(e.message);
        }
    };
}

export default new CardMiddlewar();
