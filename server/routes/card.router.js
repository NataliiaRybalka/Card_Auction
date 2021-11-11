import { Router } from 'express';

import cardMiddlewar from '#middlewars/card/card.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import cardController from '#controllers/card/card.controller';

const router = Router();

router.use(
    tokenMiddlewar.checkAccessToken
);

router.get(
    '/',
    cardController.getAllCards
);

router.post(
    '/',
    userMiddlewar.checkIsAdmin,
    cardMiddlewar.checkCardDataValidity,
    cardMiddlewar.checkCardImageValidity,
    cardMiddlewar.checkIsCardBeenAdd,
    cardController.createCard
);

router.get(
    '/:userId',
    userMiddlewar.checkRole,
    cardController.getUserCardsInStock
);

export default router;
