import { Router } from 'express';

import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import historyController from '#controllers/card/history.controller';

const router = Router();

router.get(
    '/:userId',
    tokenMiddlewar.checkAccessToken,
    userMiddlewar.checkRole,
    historyController.getHistory
);

export default router;
