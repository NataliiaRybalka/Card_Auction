import { OK, Created } from '#constants/responseCodes.enum';
import auctionService from '#services/auction/auction.service';

import {io} from '../../app';

class AuctionController {
    async getAllAuctions(req, res, next) {
        try {
        res.status(OK).json(await auctionService.getAllAuctions(req.query));
        } catch (e) {
        next(e);
        }
    };

    async createAuction(req, res, next) {
        try {
        const {
            body: auctionData,
            role
        } = req;

        res.status(Created).json(await auctionService.createAuction(auctionData, role));
        }  catch (e) {
        next(e);
        }
    };

    async updateRateAuction(req, res, next) {
        try {
        const {
            body: { newPrice },
            params: { auctionId },
            userId 
        } = req;

        const auction = await auctionService.updateRateAuction(auctionId, newPrice, userId);
        io.emit('update auction rate', auction);
        res.status(Created).json(auction);
        } catch (e) {
        next(e);
        }
    };

    async cancelAuction(req, res, next) {
        try {
        res.status(Created).json(await auctionService.cancelAuction(req.params.auctionId));
        } catch (e) {
        next(e);
        }
    };

    async getTotalAuctions(req, res, next) {
        try {
        res.status(OK).json(await auctionService.getTotalAuctions());
        } catch (e) {
        next(e);
        }
    };
}

export default new AuctionController();
