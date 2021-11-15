import logger from '#config/logger.config';
import { INACTIVE } from "#constants/project.constants";
import { ErrorHandler } from "#helpers/error.handler";
import { BadRequest, Forbidden } from '#constants/responseCodes.enum';
import auctionRepository from '#repositories/auction/auction.repository';
import auctionValidator from '#validators/auctionData.validator';

class AuctionMiddlewar {
    async checkAuctionDataValidity(req, res, next) {
        try {
        const { error } = await auctionValidator.createAuctionData.validate(req.body);

        if (error) {
            throw new ErrorHandler(BadRequest, error);
        }

        next();
        } catch (e) {
        logger.error(e);
        res.send(BadRequest, e.errors);
        }
    };

    async checkIsCorrectRate(req, res, next) {
        try {
        const {
            body: { newPrice },
            params: { auctionId }
        } = req;

        let auction = await auctionRepository.getOneAuctionById(auctionId);
        auction = auction.toJSON();

        const minStep = auction.current_price + auction.min_step;
        if (minStep > newPrice) {
            throw new ErrorHandler(Forbidden, `You can not suggest less, then ${minStep}`);
        }
        if (auction.max_price < newPrice) {
            throw new ErrorHandler(Forbidden, `You can not suggest more, then ${auction.max_price}`);
        }

        next();
        } catch (e) {
        logger.error('New price is not validity', e);
        res.status(Forbidden).json('You can not suggest this price');
        }
    };

    async checkIsAuctionActive(req, res, next) {
        try {
        const { auctionId } = req.params;

        let auction = await auctionRepository.getOneAuctionById(auctionId);
        auction = auction.toJSON();

        if(auction.status === INACTIVE) {
            throw new ErrorHandler(BadRequest, 'This auction has already completed');
        }

        next();
        } catch (e) {
        logger.error('This auction has already completed', e);
        res.status(BadRequest).json('This auction has already completed');
        }
    };
}

export default new AuctionMiddlewar();
