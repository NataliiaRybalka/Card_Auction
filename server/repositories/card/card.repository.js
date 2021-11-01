import { Card } from '#models/Card';
import { UserCard } from '#models/UserCard';

class CardRepository {
    async getAllCards() {
        try {
            return await Card.fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async getAllUserCards(user_id) {
        try {
            return await UserCard.where({ user_id }).fetchAll();
        } catch (e) {
            console.log(e);
        }
    };

    async getOneCardById(id) {
        try {
            return await Card.where({ id }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async createCard(name, is_alive, species, type, gender, location_id, image) {
        try {
            return await Card.forge({
                name,
                is_alive,
                species,
                type,
                gender,
                location_id,
                image
            }).save();
        }  catch (e) {
            console.log(e);
        }
    };

    async getOneCardByName(name) {
        try {
            return await Card.where({ name }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async updateTimesSold(id, times_sold) {
      try {
          return await Card.forge({ id }).save({ times_sold });
      }  catch (e) {
          console.log(e);
      }
    };
}

export default new CardRepository();
