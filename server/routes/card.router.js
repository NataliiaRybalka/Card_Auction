import { Router } from 'express';

import cardMiddlewar from '#middlewars/card/card.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import cardController from '#controllers/card/card.controller';

const router = Router();

router.get(
    '/',
    tokenMiddlewar.checkAccessToken,
    cardController.getAllCards
);

router.post(
    '/',
    tokenMiddlewar.checkAccessToken,
    userMiddlewar.checkIsAdmin,
    cardMiddlewar.checkCardDataValidity,
    cardMiddlewar.checkIsCardBeenAdd,
    cardController.createCard
);

router.get(
  '/:userId',
  tokenMiddlewar.checkAccessToken,
  userMiddlewar.checkRole,
  cardController.getUserCardsInStock
);

export default router;
