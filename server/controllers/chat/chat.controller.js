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

    async createChat(req, res, next) {
        try {
            return res.status(Created).json(await chatService.createChat(req.body.to, req.userId));
        } catch (e) {
            next(e);
        }
    };
}

export default new ChatController();
