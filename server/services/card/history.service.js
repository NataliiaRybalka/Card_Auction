import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import cardRepository from '#repositories/card/card.repository';

class HistoryService {
  async getHistory(userId) {
    try {
      let userCards = await cardRepository.getAllSoldUserCards(userId);
      userCards = userCards.toJSON();

      const cards = [];
      for (const user of userCards) {
        let card = await cardRepository.getOneCardById(user.card_id);
        card = card.toJSON();

        user.bought_at = user.bought_at.toDateString();
        user.sold_at = user.sold_at.toDateString();
        card.info = user;

        cards.push(card);
      }

      return cards;
    }  catch (e) {
      logger.error(e);
      throw new ErrorHandler(e.status, e.message);
    }
  };
}

export default new HistoryService();
