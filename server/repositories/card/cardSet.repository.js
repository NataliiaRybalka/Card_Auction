import { CardSet } from "#models/CardSet";

class CardSetRepository {
    async getAllCardSets() {
        try {
            return await CardSet.fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async createCardSet(card_id, set_id) {
        try {
            return await CardSet.forge({ card_id, set_id }).save();
        } catch (e) {
            console.log(e);
        }
    };

    async getOneCardSetByCardId(card_id) {
        try {
            return await CardSet.where({ card_id }).fetch();
        } catch (e) {
            console.log(e);
        }
    };
}

export default new CardSetRepository();
