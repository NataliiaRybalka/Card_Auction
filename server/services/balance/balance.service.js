import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import balanceRepository from '#repositories/balance/balance.repository';

class BalanceService {
  async getCurrentBalance(userId) {
    try {
      let balance = await balanceRepository.getCurrentBalance(userId);
      balance = balance.toJSON();
      return Object.values(balance);
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(e.status, e.message);
    }
  };

  async createTransaction(userId, sum) {
    try {
      await balanceRepository.createTransaction(userId, sum);
      return await balanceRepository.getCurrentBalance(userId);
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(e.status, e.message);
    }
  };
}

export default new BalanceService();
