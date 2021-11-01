import { Router } from 'express';

import registrMiddlewar from '#middlewars/auth/registr.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import userController from '#controllers/user/user.controller';

const router = Router();

router.get(
    '/',
    tokenMiddlewar.checkAccessToken,
    userMiddlewar.checkRole,
    userController.getAllUsers
);

router.get(
    '/:user_id',
    tokenMiddlewar.checkAccessToken,
    userMiddlewar.checkRole,
    userController.getOneUser
);

router.put(
    '/:user_id',
    tokenMiddlewar.checkAccessToken,
    userMiddlewar.checkUpdatedUserData,
    registrMiddlewar.checkIsEmailBusy,
    userController.updateUserData
);

router.delete(
    '/:user_id',
    tokenMiddlewar.checkAccessToken,
    userController.deleteUser
);

export default router;
