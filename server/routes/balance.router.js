import { Router } from 'express';

import tokenMiddlewar from '#middlewars/user/token.middlewar';
import balanceController from '#controllers/balance/balance.controller';

const router = Router();

router.use(
  tokenMiddlewar.checkAccessToken
);

router.get(
    '/',
    balanceController.getCurrentBalance
);

router.post(
  '/',
  balanceController.createTransaction
);

export default router;