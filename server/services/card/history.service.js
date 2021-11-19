import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import cardRepository from '#repositories/card/card.repository';
import cardEpisodeRepository from '#repositories/card/cardEpisode.repository';
import userCardRepository from '#repositories/user/userCard.repository';
import episodeService from './episode.service';
import locationService from './location.service';

class HistoryService {
    async getHistory(userId, params) {
        try {
        let {
            limit,
            offset
        } = params;
        offset = (offset - 1) * limit;

        const res = await userCardRepository.getAllSoldUserCards(userId, limit, offset);
        const userCards = res.toJSON();
        const totalItem = res.pagination.rowCount;

        const cards = [];
        for (const user of userCards) {
            let card = await cardRepository.getOneCardById(user.card_id);
            card = card.toJSON();

            user.bought_at = user.bought_at.toDateString();
            user.sold_at = user.sold_at.toDateString();
            card.info = user;

            cards.push(card);
        }

        for (const card of cards) {
            let location = await locationService.getLocationById(card.location_id);
            location = location.toJSON();
            
            card.location_title = location.title;
            card.location_type = location.type;
            
            let cardEpisode = await cardEpisodeRepository.getCardEpisodeByCardId(card.id);
            cardEpisode = cardEpisode.toJSON();
            
            let episode = await episodeService.getEpisodeById(cardEpisode.episode_id);
            episode = episode.toJSON();

            card.episode_title = episode.title;
            card.episode_air_date = episode.air_date;
            card.episode_series = episode.series;
        }

        return {
            cards,
            totalItem
        };
        }  catch (e) {
        logger.error(e);
        throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new HistoryService();
