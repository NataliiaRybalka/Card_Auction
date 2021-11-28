import { OK, Created } from '#constants/responseCodes.enum';
import chatService from '#services/chat/chat.service';

class ChatController {
    async getAllChats(req, res, next) {
        try {
            return res.status(OK).json(await chatService.getAllChats(req.query, req.userId));
        } catch (e) {
            next(e);
        }
    };
}

export default new ChatController();
