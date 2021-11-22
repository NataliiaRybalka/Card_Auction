import logger from '#config/logger.config';
import { NotFoundMes, TransactionFailed } from '#constants/errorMessages.enum';
import { AMOUNT } from "#constants/project.constants";
import { InternalServerError, NotFound } from '#constants/responseCodes.enum';
import { Transaction } from "#models/Transaction";
import { TransactionView } from "#models/TransactionView";
import { ErrorHandler } from '#helpers/error.handler';

class BalanceRepository {
  async getCurrentBalance(user_id) {
    try {
      return await TransactionView.where({ user_id }).query((qb) => {
        qb.sum(AMOUNT)
      }).fetch();
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(NotFound, NotFoundMes);
    }
  };

  async getAllTransactions(user_id) {
    try {
      return await Transaction.where({ user_id }).query(qb => qb.orderBy('created_at', 'DESC')).fetchAll();
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(NotFound, NotFoundMes);
    }
  };

  async createTransaction(user_id, sum) {
    try {
      return await Transaction.forge({
        user_id,
        created_at: new Date(),
        amount: sum
      }).save();
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(InternalServerError, TransactionFailed);
    }
  };
}

export default new BalanceRepository();
