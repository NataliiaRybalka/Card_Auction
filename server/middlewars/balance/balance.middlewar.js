import logger from "#config/logger.config";
import { Forbidden } from '#constants/responseCodes.enum';
import { ErrorHandler } from "#helpers/error.handler";
import balanceRepository from '#repositories/balance/balance.repository';

class BalanceMiddlewar {
    async checkBalance(req, res, next) {
        try {
            const {
                body: { newPrice },
                userId
            } = req;

            let currentBalance = await balanceRepository.getCurrentBalance(userId);
            currentBalance = currentBalance.toJSON();
            if (Object.values(currentBalance) < newPrice) {
                throw new ErrorHandler(Forbidden, 'There is not enough money in your account. Please, top up your balance.');
            }

            next();
        } catch (e) {
            logger.error(e);
            res.status(e.status).json(e.message);
        }
    };
}

export default new BalanceMiddlewar();
