import logger from '#config/logger.config';
import { CARD, USER_CARD } from "#constants/database.enum";
import { PRICE_MAX, PRICE_MIN, SORT_PRICE, FILTER_CARD } from '#constants/filters.enum';
import { ADMIN } from "#constants/project.constants";
import { ErrorHandler } from '#helpers/error.handler';
import auctionRepository from '#repositories/auction/auction.repository';
import cardRepository from '#repositories/card/card.repository';
import cronRepository from '#repositories/cron/cron.repository';
import userRepository from '#repositories/user/user.repository';
import balanceService from '#services/balance/balance.service';
import cardService from '#services/card/card.service';
import userService from '#services/user/user.service';
import userCardService from '#services/user/userCard.service';

class AuctionService {
    createRawForGetFilteredAuctions(params) {
        let filter = 'id > 0 ';
        let sort = 'DESC';

        for (const key in params) {
            const val = params[key];

            if (val) {
                if (key === SORT_PRICE) {
                    sort = val;
                } else if (key === FILTER_CARD) {
                    filter += `AND a.lot_id = ${val} `;
                } else if (key === PRICE_MIN) {
                    filter += `AND a.current_price >= ${val} `;
                } else if (key === PRICE_MAX) {
                    filter += `AND a.current_price <= ${val} `;
                }
            }
        }

        return {
            filter,
            sort
        }
    };

    async getAllAuctions(params) {
        try {
            let {
                limit,
                offset,
                lotId,
                priceMin,
                priceMax,
                sortPrice
            } = params;
            offset = (offset - 1) * limit;

            const { filter, sort } = this.createRawForGetFilteredAuctions({ lotId, priceMin, priceMax, sortPrice });
            const res = await auctionRepository.getAllAuctionsWithFilter(limit, offset, filter, sort);
            const auctions = Object.values(JSON.parse(JSON.stringify(res.auctions)));
            const auctionsWithoutPagination = Object.values(JSON.parse(JSON.stringify(res.auctionsWithoutPagination)));
            const totalItem = Object.values(Object.values(JSON.parse(JSON.stringify(res.totalItem)))[0])[0];

            for (const auction of auctions) {
                let card = await cardRepository.getNameAndImageOneCardById(auction.lot_id);
                card = card.toJSON();
                auction.card = card;

                if (auction.customer_id) {
                    let user = await userRepository.getUserLoginById(auction.customer_id);
                    user = user.toJSON();
                    auction.customer_id = user;
                }

                const finalDateMS = Date.parse(auction.created_at) + auction.max_time;
                const date = new Date(finalDateMS).toString();
                const finalDate = date.split(' ');
                finalDate.splice(5);
                finalDate.splice(0, 1);
                auction.finalDate = finalDate.join(' ');
            }

            for (const auction of auctionsWithoutPagination) {
                let card = await cardRepository.getNameAndImageOneCardById(auction.lot_id);
                card = card.toJSON();
                auction.card = card;
            }

            return {
                auctions,
                auctionsWithoutPagination,
                totalItem
            };
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createAuction(auctionData, role) {
        try {
            const { lotId, initPrice, maxPrice, minStep, maxTime } = auctionData;

            const maxTimeNum = maxTime * 24 * 60 * 60 * 1000;
            const lotType = (role === ADMIN) ? CARD : USER_CARD;
            const current_price = initPrice;

            let createdAuction = await auctionRepository.createAuction(lotId, lotType, initPrice, maxPrice, current_price, minStep, maxTimeNum);
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

    async getTotalAuctions() {
        try {
            return await auctionRepository.getTotalAuctions();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new AuctionService();
