import { CardEpisode } from "#models/CardEpisode";

class CardEpisodeRepository {
    async createCardEpisode(card_id, episode_id) {
        try {
            return await CardEpisode.forge({ card_id, episode_id }).save();
        } catch (e) {
            console.log(e);
        }
    };
}

export default new CardEpisodeRepository();
