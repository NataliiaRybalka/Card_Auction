import logger from '#config/logger.config';
import { ACCESS_EXPIRES_MS } from '#constants/tokens.constants';
import { ErrorHandler } from '#helpers/error.handler';
import auctionRepository from '#repositories/auction/auction.repository';
import cardSetRepository from '#repositories/card/cardSet.repository';
import cronRepository from '#repositories/cron/cron.repository';
import setRepository from '#repositories/card/set.repository';
import tokenRepository from '../../repositories/auth/token.repository';
import userRepository from '#repositories/user/user.repository';
import userCardRepository from '#repositories/user/userCard.repository';

class CronService {
  async updateUserRating() {
    try {
      let cronTasks = await cronRepository.getAllTasks();
      cronTasks = cronTasks.toJSON();

      let sets = await setRepository.getAllSets();
      sets = sets.toJSON();

      let cardSets = await cardSetRepository.getAllCardSets();
      cardSets = cardSets.toJSON();

      let cardSetsArr = [];
      sets.forEach(set => {
        cardSetsArr.push(cardSets.filter(cardSet => cardSet.set_id === set.id));
      });
      cardSetsArr = cardSetsArr.filter(val => val.length !== 0);

      for (const cronTask of cronTasks) {
        let userCards;
        if (!cronTask.user_id) {
          userCards = await userCardRepository.getAllUsersCardsPresent();
        } else {
          userCards = await userCardRepository.getAllUserCardsPresentByUserId(cronTask.user_id);
        }
        userCards = await userCards.toJSON();

        let bonusForSet = 0;
        cardSetsArr.forEach(val => {
          let userCardSet = [];
          val.forEach(one => {
            userCardSet.push(userCards.find(userCard => userCard.card_id === one.card_id));
          })
          userCardSet = userCardSet.filter(one => one !== undefined);

          if (val.length === userCardSet.length) {
            const set = sets.find(set => set.id === val[0].set_id);
            bonusForSet += set.bonus;
          }
        });
        await userRepository.updateUserRating(cronTask.user_id, userCards.length + bonusForSet);

        await cronRepository.deleteTasks(cronTask.id);
      }
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(e.status, e.message);
    }
  };

  async countTotal() {
    try {
      const totalUsers = await userRepository.countTotalUsers();
      await userRepository.writeDownTotalUsers(totalUsers);

      const yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString('en-CA');
      const totalAuctions = await auctionRepository.countTotalAuctions(`${yesterday} 00:00:00`, `${yesterday} 23:59:59`);
      await auctionRepository.writeDownTotalAuctions(totalAuctions);
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(e.status, e.message);
    }
  };

  async deleteTokens() {
    try {
      let tokens = await tokenRepository.getTokens();
      tokens = tokens.toJSON();
      
      tokens.forEach(async token => {
        const timePassed = Date.parse(token.created_at) + ACCESS_EXPIRES_MS;
        if (timePassed < Date.now()) {
          await tokenRepository.deleteTokens(token.id);
        }
      });
    } catch (e) {
      logger.error(e);
      throw new ErrorHandler(e.status, e.message);
    }
  };
}

export default new CronService();