import { OK } from '#constants/responseCodes.enum';
import historyService from '#services/card/history.service';

class HistoryController {
    async getHistory(req, res, next) {
        try {
            res.status(OK).json(await historyService.getHistory(req.userId, req.query));
        }  catch (e) {
            next(e);
        }
    };
}

export default new HistoryController();
