import logger from '#config/logger.config';
import { ALIVE, DEAD, USER } from '#constants/project.constants';
import { ErrorHandler } from '#helpers/error.handler';
import { createPhotoPath } from '#helpers/createPhotoPath';
import cardRepository from '#repositories/card/card.repository';
import cardEpisodeRepository from '#repositories/card/cardEpisode.repository';
import episodeService from "./episode.service";
import locationService from "./location.service";

class CardService {
    async getAllCards(params) {
        try {
            let {
                limit,
                offset
            } = params;
            offset = (offset - 1) * limit;

            const res = await cardRepository.getAllCards(limit, offset);
            const cards = res.toJSON();
            const totalItem = res.pagination.rowCount;

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
            }
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

                return cards;
            }
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };

    async createCard(cardData, photo) {
        try {
            let { name, isAlive, species, gender, locationTitle, locationType, episodeTitle, episodeAirDate, series } = cardData;
            isAlive = isAlive === ALIVE ? true : false;

            const location = await locationService.createLocation(locationTitle, locationType);
            const episode = await episodeService.createEpisode(episodeTitle, episodeAirDate, series);

            let card = await cardRepository.createCard(name, isAlive, species, gender, location.id);
            card = card.toJSON();

            await cardEpisodeRepository.createCardEpisode(card.id, episode.id);

            if (photo) {
                const { finalPath, photoPath } = await createPhotoPath(photo.name, card.id);
                await photo.mv(finalPath);
        
                card = await cardRepository.addImageForCard(card.id, photoPath);
            };

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
            let card = await cardRepository.getOneCardById(id);
            card = card.toJSON();

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
            
            return card;
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
