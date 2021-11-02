import logger from '#config/logger.config';
import { CARD, USER_CARD } from "#constants/database.enum";
import { ADMIN } from "#constants/project.constants";
import { ErrorHandler } from '#helpers/error.handler';
import auctionRepository from '#repositories/auction/auction.repository';
import balanceService from '#services/balance/balance.service';
import cardService from '#services/card/card.service';
import cronRepository from '#repositories/cron/cron.repository';
import userService from '#services/user/user.service';
import userCardService from '#services/user/userCard.service';

class AuctionService {
    async getAllAuctions() {
        try {
            return await auctionRepository.getAllAuctions();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createAuction(auctionData, role) {
        try {
            const { lotId, initPrice, maxPrice, minStep, maxTime, minExtensionTime } = auctionData;

            const maxTimeNum = maxTime * 24 * 60 * 60 * 1000;
            const minExtensionTimeNum = minExtensionTime * 24 * 60 * 60 * 1000;
            const lotType = (role === ADMIN) ? CARD : USER_CARD;

            let createdAuction = await auctionRepository.createAuction(lotId, lotType, initPrice, maxPrice, minStep, maxTimeNum, minExtensionTimeNum);
            createdAuction = createdAuction.toJSON();

            return await auctionRepository.getOneAuctionById(createdAuction.id);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async updateRateAuction(auctionId, newPrice, userId) {
        try {
            await auctionRepository.updateRateAuction(auctionId, newPrice, userId);
            return await auctionRepository.getOneAuctionById(auctionId);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async cancelAuction(id) {
        try {
            return await auctionRepository.updateStatusAuction(id);
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async stopAuction() {
        try {
            let auctions = await auctionRepository.getAllActiveAuctions();
            auctions = auctions.toJSON();

            auctions.map(async (auction) => {
                const timePassed = Date.parse(auction.created_at) + auction.max_time;
                if (timePassed <= Date.now()) {
                    await auctionRepository.updateStatusAuction(auction.id);

                    if (auction.customer_id) {
                        let card;
                        if (auction.lot_type === CARD) {
                            card = await cardService.getOneCardById(auction.lot_id);

                            await cardService.updateTimesSold(auction.lot_id, card.times_sold = card.times_sold + 1);
                        } else if (auction.lot_type === USER_CARD) {
                            const userCard = await userCardService.getOneUserCardById(auction.lot_id);

                            card = await cardService.getOneCardById(userCard.card_id);

                            await userCardService.soldUserCard(auction.lot_id, auction.current_price);
                            await balanceService.createTransaction(userCard.user_id, auction.current_price);
                            await cronRepository.createTask(userCard.user_id);
                        }
                        await userCardService.createUserCard(auction.customer_id, card.id, auction.current_price);
                        const user = await userService.getOneUser(auction.customer_id);
                        await balanceService.createTransaction(user.id, -(auction.current_price));
                        await userService.updateUserRating(auction.customer_id, user.rating = user.rating + 1);

                        await cronRepository.createTask(auction.customer_id);
                    }
                }
            });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new AuctionService();
