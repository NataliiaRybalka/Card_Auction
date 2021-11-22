import { OK, Created } from "#constants/responseCodes.enum";
import balanceService from '#services/balance/balance.service';

class BalanceController {
    async getCurrentBalance(req, res, next) {
        try {
            res.status(OK).json(await balanceService.getCurrentBalance(req.userId));
        } catch (e) {
            next(e);
        }
    };

    async createTransaction(req, res, next) {
        try {
            const {
                body: { sum },
                userId
            } = req;
            res.status(Created).json(await balanceService.createTransaction(userId, sum));
        } catch (e) {
            next(e);
        }
    };
}

export default new BalanceController();
