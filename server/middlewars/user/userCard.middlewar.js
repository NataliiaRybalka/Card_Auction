import logger from '#config/logger.config';
import { USER, USER_CARD } from "#constants/database.enum";
import { ACTIVE } from "#constants/project.constants";
import { Forbidden } from '#constants/responseCodes.enum';
import { ErrorHandler } from "#helpers/error.handler";
import auctionRepository from '#repositories/auction/auction.repository';
import userCardRepository from '#repositories/user/userCard.repository';

class UserCardMiddlewar {
    async checkIsUserCardNotSold(req, res, next) {
        try {
            const {
                body: { lotId },
                role
            } = req;

            if (role === USER) {
                let userCard = await userCardRepository.getOneUserCardById(lotId);
                userCard = userCard.toJSON();

                let auction = await auctionRepository.getOneAuctionByLotId(lotId, USER_CARD);

                if (userCard.sold_at || (auction && auction.status === ACTIVE)) {
                    throw new ErrorHandler(Forbidden, 'Card has been already sold');
                }
            }

            next();
        } catch (e) {
            logger.error(e);
            res.status(e.status).json(e.message);
        }
    };
}

export default new UserCardMiddlewar();
