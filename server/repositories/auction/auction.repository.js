import logger from '#config/logger.config';
import { NotFoundMes, NotCreated, NotUpdated } from '#constants/errorMessages.enum';
import { ACTIVE, INACTIVE } from "#constants/project.constants";
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { Auction } from '#models/Auction';
import { ErrorHandler } from '#helpers/error.handler';

class AuctionRepository {
    async getAllAuctions() {
        try {
            return await Auction.query(qb => qb.orderBy('created_at', 'DESC')).fetchAll();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(NotFound, NotFoundMes);
        }
    };

    async createAuction(lot_id, lot_type, init_price, max_price, min_step, max_time, min_extension_time) {
        try {
            return await Auction.forge({
                lot_id,
                lot_type,
                init_price,
                max_price,
                min_step,
                max_time,
                min_extension_time,
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
