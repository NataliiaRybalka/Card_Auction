import cardRepository from "#repositories/card/card.repository";
import cardSetRepository from "#repositories/card/cardSet.repository";
import cronRepository from '#repositories/cron/cron.repository';
import setRepository from "#repositories/card/set.repository";

class CardSetService {
    async getAllCardSets() {
        try {
            let cardSets = await cardSetRepository.getAllCardSets();
            cardSets = cardSets.toJSON();

            const cards = [];
            const sets = [];
            for (const cardSet of cardSets) {
                const card = await cardRepository.getOneCardById(cardSet.card_id);
                cards.push(card.toJSON());

                const set = await setRepository.getOneSetById(cardSet.set_id);
                sets.push(set.toJSON());
            }

            return {
                cards,
                sets
            }
        } catch (e) {
            console.log(e);
        }
    };

    async createCardSet(cardId, setId) {
      try {
          await cardSetRepository.createCardSet(cardId, setId);
          await cronRepository.createTask();
          return await cardSetRepository.getOneCardSetByCardId(cardId);
      }  catch (e) {
          console.log(e);
      }
    };
}

export default new CardSetService();
