import { OK } from '#constants/responseCodes.enum';
import chatService from '#services/chat/chat.service';

class ChatController {
    async getAllChats(req, res, next) {
        try {
            return res.status(OK).json(await chatService.getAllChats(req.query, req.userId));
        } catch (e) {
            next(e);
        }
    };

    async getChat(req, res, next) {
        try {
            return res.status(OK).json(await chatService.getChat(req.params.userId, req.userId));
        } catch (e) {
            next(e);
        }
    };
}

export default new ChatController();
