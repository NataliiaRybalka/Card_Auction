import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import balanceRepository from '#repositories/balance/balance.repository';

class BalanceService {
  async getCurrentBalance(userId) {
    try {
      let balance = await balanceRepository.getCurrentBalance(userId);
      balance = balance.toJSON();
      let transactions = await balanceRepository.getAllTransactions(userId);
      transactions = transactions.toJSON();

      for (const transaction of transactions) {
        const finalDateMS = Date.parse(transaction.created_at);
        const date = new Date(finalDateMS).toString();
        const finalDate = date.split(' ');
        finalDate.splice(5);
        finalDate.splice(0, 1);
        transaction.finalDate = finalDate.join(' ');
      }

      return {
        balance: Object.values(balance),
        transactions
      };
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
