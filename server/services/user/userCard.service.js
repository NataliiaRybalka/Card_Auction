import userCardRepository from '#repositories/user/userCard.repository';

class UserCardService {
  async getOneUserCardById(id) {
    try {
      let userCard = await userCardRepository.getOneUserCardById(id);
      return userCard.toJSON();
    } catch (e) {
      console.log(e);
    }
  };

  async soldUserCard(cardId, currentPrice) {
    try {
      return await userCardRepository.soldUserCard(cardId, currentPrice);
    } catch (e) {
      console.log(e);
    }
  };

  async createUserCard(userId, cardId, currentPrice) {
    try {
      return await userCardRepository.createUserCard(userId, cardId, currentPrice);
    } catch (e) {
      console.log(e);
    }
  };
}

export default new UserCardService();
