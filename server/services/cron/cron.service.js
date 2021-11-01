import cronRepository from '#repositories/cron/cron.repository';
import setRepository from '#repositories/card/set.repository';
import userRepository from '#repositories/user/user.repository';
import userCardRepository from '#repositories/user/userCard.repository';

class CronService {
  async updateUserRating() {
    try {
      let cronTasks = await cronRepository.getAllTasks();
      cronTasks = cronTasks.toJSON();

      let sets = await setRepository.getAllSets();
      sets = sets.toJSON();

      for (const cronTask of cronTasks) {
        let userCards;
        if (!cronTask.user_id) {
          userCards = await userCardRepository.getAllUsersCardsPresent();
        } else {
          userCards = await userCardRepository.getAllUserCardsPresentByUserId(cronTask.user_id);
        }
        userCards = await userCards.toJSON();

        let collectedSetCards = [];
        for (let i = 0; i < sets.length; i++) {
          for (let j = 0; j < sets[i].card_set.length; j++) {
            for (let a = 0; a < userCards.length; a++) {
              if (sets[i].card_set[j].card_id === userCards[a].card_id) {
                collectedSetCards.push(sets[i].card_set[j]);
              }
            }
          }
        }

        let collectedSets = [];
        for (let i = 0; i < sets.length; i++) {
          for (let j = 0; j < sets[i].card_set.length; j++) {
            const length = collectedSetCards.filter(collectedSet => collectedSet.card_id === sets[i].card_set[j].card_id).length;

            if (sets[i].card_set.length === length) {
              collectedSets.push(sets[i]);
            }
          }
        }

        let bonusForSet = collectedSets.reduce((bonusForSet, set) => set.bonus + bonusForSet, 0);

        await userRepository.updateUserRating(cronTask.user_id, (userCards.length + bonusForSet));

        await cronRepository.deleteTasks(cronTask.id);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default new CronService();
