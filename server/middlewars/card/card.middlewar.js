import logger from '#config/logger.config';
import { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } from '#constants/file.constants';
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

    async checkCardImageValidity(req, res, next) {
        try {
            if (req.files) {
                const file = req.files.image[0];
                const { size, mimetype } = file;

                if (!IMAGE_MIMETYPES.includes(mimetype)) {
                    console.log('mimetype');
                    throw new ErrorHandler(
                        responseCodes.Unsupported_Media_Type,
                        errorMessages.WRONG_MIMETYPE.message,
                        errorMessages.WRONG_MIMETYPE.code
                    )
                }
                if (size > IMAGE_MAX_SIZE) {
                    console.log('size');
                    throw new ErrorHandler(
                        responseCodes.Unsupported_Media_Type,
                        errorMessages.WRONG_FILE_SIZE.message,
                        errorMessages.WRONG_FILE_SIZE.code
                    )
                }

                req.photo = file;
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
