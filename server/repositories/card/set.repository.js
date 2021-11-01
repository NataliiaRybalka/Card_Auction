import { Set } from "#models/Set";

class SetRepository {
    async createSet(title, bonus) {
        try {
            return await Set.forge({ title, bonus }).save();
        } catch (e) {
            console.log(e);
        }
    };

    async getOneSetById(id) {
        try {
            return await Set.where({ id }).fetch();
        } catch (e) {
            console.log(e);
        }
    };

    async getAllSets() {
        try {
            return await Set.fetchAll({
                withRelated: ['card_set']
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export default new SetRepository();
