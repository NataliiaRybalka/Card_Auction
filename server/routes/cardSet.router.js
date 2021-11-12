import { Router } from 'express';

import setMiddlewar from '#middlewars/card/set.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import cardSetController from "#controllers/card/cardSetController";

const router = Router();

router.use(
    tokenMiddlewar.checkAccessToken
);

router.get(
    '/',
    cardSetController.getAllCardSets
);

router.post(
    '/',
    userMiddlewar.checkIsAdmin,
    setMiddlewar.checkSetDataValidity,
    cardSetController.createCardSet
);

export default router;
