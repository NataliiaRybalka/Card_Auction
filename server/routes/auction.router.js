import { Router } from 'express';

import auctionMiddlewar from '#middlewars/auction/auction.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import userCardMiddlewar from '#middlewars/user/userCard.middlewar';
import auctionController from '#controllers/auction/auction.controller';

const router = Router();

router.get(
    '/',
    tokenMiddlewar.checkAccessToken,
    auctionController.getAllAuctions
);

router.post(
    '/',
    tokenMiddlewar.checkAccessToken,
    userMiddlewar.checkRole,
    userCardMiddlewar.checkIsUserCardNotSold,
    auctionMiddlewar.checkAuctionDataValidity,
    auctionController.createAuction
);

router.put(
    '/:auctionId',
    tokenMiddlewar.checkAccessToken,
    auctionMiddlewar.checkIsCorrectRate,
    auctionMiddlewar.checkIsAuctionActive,
    auctionController.updateRateAuction
);

router.put(
    '/:auctionId/cancel',
    tokenMiddlewar.checkAccessToken,
    auctionMiddlewar.checkIsAuctionActive,
    auctionController.cancelAuction
);

export default router;
