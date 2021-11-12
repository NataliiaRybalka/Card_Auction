import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import cardRepository from "#repositories/card/card.repository";
import cardSetRepository from "#repositories/card/cardSet.repository";
import cronRepository from '#repositories/cron/cron.repository';
import setRepository from "#repositories/card/set.repository";

class CardSetService {
    async getAllCardSets() {
        try {
            let cardSets = await cardSetRepository.getAllCardSets();
            cardSets = cardSets.toJSON();

            let cards = [];
            let sets = [];
            for (const cardSet of cardSets) {
                const card = await cardRepository.getOneCardById(cardSet.card_id);
                cards.push(card.toJSON());

                const set = await setRepository.getOneSetById(cardSet.set_id);
                sets.push(set.toJSON());
            }

            const newCardSets = [];
            for (const cardSet of cardSets) {
                const oneNewCardSet = {
                    cards: []
                };             
                oneNewCardSet.set = sets.find(set => set.id === cardSet.set_id);
                newCardSets.push(oneNewCardSet);
            }

            for (let i = 0; i < newCardSets.length; i++) {
                if (newCardSets[i].set.id === newCardSets[i + 1].set.id) {
                    newCardSets.splice((i + 1), 1);
                }
            }

            for (const newCardSet of newCardSets) {
                cardSets.forEach(cardSet => {
                    if (cardSet.set_id === newCardSet.set.id) {
                        newCardSet.cards.push(cards.find(card => card.id === cardSet.card_id));
                    }
                });
            }

            return newCardSets;
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createCardSet(cardId, setId) {
        try {
            await cardSetRepository.createCardSet(cardId, setId);
            await cronRepository.createTask();
            return await cardSetRepository.getOneCardSetByCardId(cardId);
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new CardSetService();
