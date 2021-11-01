import { UserCard } from '#models/UserCard';

class UserCardRepository {
    async soldUserCard(id, price_sold) {
        try {
            return await UserCard.forge({ id }).save({ price_sold, sold_at: Date.now() });
        } catch (e) {
            console.log(e);
        }
    };

    async createUserCard(user_id, card_id, price_bought) {
        try {
            return await UserCard.forge({ user_id, card_id, price_bought, bought_at: new Date() }).save();
        } catch (e) {
            console.log(e);
        }
    };

    async getOneUserCardById(id) {
        try {
            return await UserCard.where({ id }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async getAllUserCardsPresentByUserId(user_id) {
        try {
            return await UserCard.where({ user_id, sold_at: null }).fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async getAllUsersCardsPresent() {
        try {
            return await UserCard.where({ sold_at: null }).fetchAll();
        } catch (e) {
            console.log(e);
        }
    };
}

export default new UserCardRepository();
