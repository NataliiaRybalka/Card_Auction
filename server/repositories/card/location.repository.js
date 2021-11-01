import { Location } from "#models/Location";

class LocationRepository {
    async createLocation(title, type) {
        try {
            return await Location.forge({ title, type }).save();
        } catch (e) {
            console.log(e);
        }
    };

    async getOneLocationByTitle(title) {
        try {
            return await Location.where({ title }).fetch();
        } catch (e) {
            console.log(e);
        }
    };
}

export default new LocationRepository();