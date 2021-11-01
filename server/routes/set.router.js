import { Router } from 'express';

import setMiddlewar from '#middlewars/card/set.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import setController from "#controllers/card/set.controller";

const router = Router();

router.post(
    '/',
    tokenMiddlewar.checkAccessToken,
    userMiddlewar.checkIsAdmin,
    setMiddlewar.checkSetDataValidity,
    setController.createSet
);

export default router;
