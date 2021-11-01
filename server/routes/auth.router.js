import { Router } from 'express';

import loginMiddlewar from '#middlewars/auth/login.middlewar';
import registrMiddlewar from '#middlewars/auth/registr.middlewar';
import tokenMiddlewar from '#middlewars/user/token.middlewar';
import userMiddlewar from '#middlewars/user/user.middlewar';
import loginController from '#controllers/auth/login.controller';
import registrContoller from '#controllers/auth/registr.contoller';

const router = Router();

router.post(
    '/registration',
    registrMiddlewar.checkDataValidity,
    registrMiddlewar.checkIsEmailBusy,
    registrContoller.createUser
);

router.post(
    '/login',
    loginMiddlewar.checkIsEmailCorrect,
    loginMiddlewar.checkRole,
    loginController.loginUser
);

router.post(
    '/create-tokens',
    tokenMiddlewar.checkRefreshToken,
    userMiddlewar.checkRole,
    loginController.createNewTokenPair
);

export default router;