import { INACTIVE } from "#constants/project.constants";
import { BadRequest, Forbidden } from '#constants/responseCodes.enum';
import auctionValidator from '#validators/auctionData.validator';
import auctionRepository from '#repositories/auction/auction.repository';

class AuctionMiddlewar {
    async checkAuctionDataValidity(req, res, next) {
        try {
            const { error } = await auctionValidator.createAuctionData.validate(req.body);

            if (error) {
                throw new Error(error);
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(BadRequest));
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

            const minStep = auction.current_price ? (auction.current_price + auction.min_step) : (auction.init_price + auction.min_step);
            if (minStep > newPrice) {
                throw new Error(`You can not suggest less, then ${minStep}`);
            }
            if (auction.max_price < newPrice) {
                throw new Error(`You can not suggest more, then ${auction.max_price}`);
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(Forbidden));
        }
    };

    async checkIsAuctionActive(req, res, next) {
        try {
            const { auctionId } = req.params;

            let auction = await auctionRepository.getOneAuctionById(auctionId);
            auction = auction.toJSON();

            if(auction.status === INACTIVE) {
                throw new Error('This auction has already completed');
            }

            next();
        } catch (e) {
            console.log(e);
            next(res.sendStatus(BadRequest));
        }
    };
}

export default new AuctionMiddlewar();
