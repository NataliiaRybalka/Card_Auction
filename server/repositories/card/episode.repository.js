import { Episode } from "#models/Episode";

class EpisodeRepository {
    async createEpisode(title, air_date, series) {
        try {
            return await Episode.forge({ title, air_date, series }).save();
        } catch (e) {
            console.log(e);
        }
    };

    async getOneEpisodeByTitle(title) {
        try {
            return await Episode.where({ title }).fetch();
        }  catch (e) {
            console.log(e);
        }
    };
}

export default new EpisodeRepository();
