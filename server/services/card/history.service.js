import cardRepository from '#repositories/card/card.repository';

class HistoryService {
  async getHistory(role, userId) {
    try {
      let userCards = await cardRepository.getAllUserCards(userId);
      userCards = userCards.toJSON();
      userCards = userCards.filter(userCard => userCard.sold_at);

      const cards = [];

      for (const user of userCards) {
        const card = await cardRepository.getOneCardById(user.card_id);
        cards.push(card.toJSON());
      }

      return cards;
    }  catch (e) {
      console.log(e);
    }
  };
}

export default new HistoryService();
