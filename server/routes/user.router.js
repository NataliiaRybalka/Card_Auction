import { Router } from 'express';

import cardMiddlewar from '#middlewars/card/card.middlewar';
import registrMiddlewar from '#middlewars/auth/registr.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import userController from '#controllers/user/user.controller';

const router = Router();

router.use(
    tokenMiddlewar.checkAccessToken
);

router.get(
    '/',
    userMiddlewar.checkRole,
    userController.getAllUsers
);

router.get(
    '/total',
    userController.getTotalUsers
);

router.get(
    '/:userId',
    userMiddlewar.checkRole,
    userController.getOneUser
);

router.put(
    '/:userId',
    userMiddlewar.checkUpdatedUserData,
    cardMiddlewar.checkCardImageValidity,
    registrMiddlewar.checkIsEmailBusy,
    userController.updateUserData
);

router.put(
    '/admin/:userId',
    userController.updateUserRole
);

router.delete(
    '/:userId',
    userController.deleteUser
);

export default router;
