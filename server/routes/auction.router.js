import { Router } from 'express';

import auctionMiddlewar from '#middlewars/auction/auction.middlewar';
import balanceMiddlewar from '../middlewars/balance/balance.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import userCardMiddlewar from '#middlewars/user/userCard.middlewar';
import auctionController from '#controllers/auction/auction.controller';

const router = Router();

router.use(
    tokenMiddlewar.checkAccessToken
);

router.get(
    '/',
    auctionController.getAllAuctions
);

router.get(
    '/total',
    auctionController.getTotalAuctions
);

router.post(
    '/',
    userMiddlewar.checkRole,
    userCardMiddlewar.checkIsUserCardNotSold,
    auctionMiddlewar.checkAuctionDataValidity,
    auctionController.createAuction
);

router.put(
    '/:auctionId',
    auctionMiddlewar.checkIsCorrectRate,
    balanceMiddlewar.checkBalance,
    auctionMiddlewar.checkIsAuctionActive,
    auctionController.updateRateAuction
);

router.put(
    '/:auctionId/cancel',
    auctionMiddlewar.checkIsAuctionActive,
    auctionController.cancelAuction
);

export default router;
