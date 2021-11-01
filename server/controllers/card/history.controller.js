import { OK } from '#constants/responseCodes.enum';
import historyService from '#services/card/history.service';

class HistoryController {
    async getHistory(req, res, next) {
        try {
        const { role, userId } = req;
        res.status(OK).json(await historyService.getHistory(role, userId));
        }  catch (e) {
        next(e);
        }
    };
}

export default new HistoryController();
