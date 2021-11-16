import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import cardRepository from "#repositories/card/card.repository";
import cardSetRepository from "#repositories/card/cardSet.repository";
import cronRepository from '#repositories/cron/cron.repository';
import setRepository from "#repositories/card/set.repository";
import setService from './set.service';

class CardSetService {
    async getAllCardSets() {
        try {
            let cardSets = await cardSetRepository.getAllCardSets();
            cardSets = cardSets.toJSON();

            let cards = [];
            let sets = [];
            for (const cardSet of cardSets) {
                const card = await cardRepository.getNameAndImageOneCardById(cardSet.card_id);
                cards.push(card.toJSON());

                const set = await setRepository.getOneSetById(cardSet.set_id);
                sets.push(set.toJSON());
            }

            let newCardSets = [];
            for (const cardSet of cardSets) {
                const oneNewCardSet = {
                    cards: []
                };             
                oneNewCardSet.set = sets.find(set => set.id === cardSet.set_id);
                newCardSets.push(oneNewCardSet);
            }

            for (let i = 0; i < newCardSets.length; i++) {
                if (i !== newCardSets.length - 1 && newCardSets[i].set.id === newCardSets[i + 1].set.id) {
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

            return newCardSets
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createCardSet(setData) {
        try {
            const { title, bonus, cards } = setData;

            let set = await setService.createSet(title, bonus);
            set = set.toJSON();

            for (const card of cards) {
                let fullCard = await cardRepository.getOneCardByName(card);
                fullCard = fullCard.toJSON();

                await cardSetRepository.createCardSet(fullCard.id, set.id);
            }

            await cronRepository.createTask();

            return  await cardSetRepository.getAllCardSetBySetId(set.id);
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new CardSetService();
