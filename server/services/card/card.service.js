import logger from '#config/logger.config';
import { USER } from '#constants/project.constants';
import { ErrorHandler } from '#helpers/error.handler';
import cardRepository from '#repositories/card/card.repository';
import cardEpisodeRepository from '#repositories/card/cardEpisode.repository';
import episodeService from "./episode.service";
import locationService from "./location.service";

class CardService {
    async getAllCards() {
        try {
            return await cardRepository.getAllCards();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async getAllUserCards(role, userId) {
        try {
            if (role === USER) {
                let userCards = await cardRepository.getAllUserCards(userId);
                userCards = userCards.toJSON();
                userCards = userCards.filter(userCard => !userCard.sold_at);

                const cards = [];
                for (const user of userCards) {
                    const card = await cardRepository.getOneCardById(user.card_id);
                    cards.push(card.toJSON());
                }

                return cards;
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createCard(cardData) {
        try {
            const { name, isAlive, species, type, gender, locationTitle, locationType, episodeTitle, episodeAirDate, series, image } = cardData;

            const location = await locationService.createLocation(locationTitle, locationType);
            const episode = episodeService.createEpisode(episodeTitle, episodeAirDate, series);

            let card = await cardRepository.createCard(name, isAlive, species, type, gender, location.id, image);
            card = card.toJSON();

            await cardEpisodeRepository.createCardEpisode(card.id, episode.id);

            return {
                card,
                location,
                episode
            };
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async getOneCardById(id) {
        try {
            const card = await cardRepository.getOneCardById(id);
            return card.toJSON();
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async updateTimesSold(id, times_sold) {
        try {
            return await cardRepository.updateTimesSold(id, times_sold)
        }  catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new CardService();
