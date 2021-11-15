import logger from '#config/logger.config';
import { NotFoundMes, NotCreated, NotUpdated } from '#constants/errorMessages.enum';
import { ACTIVE, INACTIVE } from "#constants/project.constants";
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { Auction } from '#models/Auction';
import { bookshelfConf } from '#models/bookshelf';
import { ErrorHandler } from '#helpers/error.handler';

class AuctionRepository {
    async getAllAuctions(limit, offset) {
        try {
            return await Auction.query(qb => qb.orderBy('created_at', 'DESC')).fetchPage({ offset, limit });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getAllAuctionsWithFilter(limit, offset, filter, sort) {
        try {
            const auctions = await bookshelfConf.knex
                .select()
                .where(bookshelfConf.knex.raw(filter))
                .from('auction as a')
                .limit(limit)
                .offset(offset)
                .orderBy('a.current_price', sort);

            const totalItem = await Auction.count();
            
            return {
                auctions,
                totalItem
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async createAuction(lot_id, lot_type, init_price, max_price, current_price, min_step, max_time) {
        try {
            return await Auction.forge({
                lot_id,
                lot_type,
                init_price,
                max_price,
                current_price,
                min_step,
                max_time,
                created_at: new Date(),
                status: ACTIVE
            }).save();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getOneAuctionById(id) {
        try {
            return await Auction.where({ id }).fetch();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async getOneAuctionByLotId(lot_id, lot_type) {
        try {
            return await Auction.where({ lot_id, lot_type }).fetch();
        } catch (e) {
            logger.error(e);
        }
    };

    async updateRateAuction(id, current_price, customer_id) {
        try {
            return await Auction.forge({ id }).save({ current_price, customer_id });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotCreated);
        }
    };

    async getAllActiveAuctions() {
        try {
            return await Auction.where({ status: ACTIVE }).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async updateStatusAuction(id) {
        try {
            return await Auction.forge({ id }).save({ status: INACTIVE });
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(InternalServerError, NotUpdated);
        }
    };
}

export default new AuctionRepository();
