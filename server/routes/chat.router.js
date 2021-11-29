import { Router } from 'express';

import chatController from '#controllers/chat/chat.controller';
import tokenMiddlewar from '#middlewars/user/token.middlewar';

const router = Router();

router.use(
    tokenMiddlewar.checkAccessToken
);

router.get(
    '/',
    chatController.getAllChats
);

router.post(
    '/',
    chatController.createChat
);

export default router;
