import { ACTIVE, INACTIVE } from "#constants/project.constants";
import { Auction } from '#models/Auction';

class AuctionRepository {
    async getAllAuctions() {
        try {
            return await Auction.fetchAll();
        } catch (e) {
            console.log(e);
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
            console.log(e);
        }
    };

    async getOneAuctionById(id) {
        try {
            return await Auction.where({ id }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async updateRateAuction(id, current_price, customer_id) {
        try {
            return await Auction.forge({ id }).save({ current_price, customer_id });
        } catch (e) {
            console.log(e);
        }
    };

    async getAllActiveAuctions() {
        try {
            return await Auction.where({ status: ACTIVE }).fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async updateStatusAuction(id) {
        try {
            return await Auction.forge({ id }).save({ status: INACTIVE });
        } catch (e) {
            console.log(e);
        }
    };
}

export default new AuctionRepository();
