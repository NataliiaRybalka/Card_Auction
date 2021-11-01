import logger from '#config/logger.config';
import { ErrorHandler } from '#helpers/error.handler';
import episodeRepository from '#repositories/card/episode.repository';

class EpisodeService {
    async createEpisode(episodeTitle, episodeAirDate, series) {
        try {
            let episode = await episodeRepository.checkIsEpisodePresent(episodeTitle);
            if (!episode) {
                episode = await episodeRepository.createEpisode(episodeTitle, episodeAirDate, series);
                episode = await episodeRepository.getOneEpisodeByTitle(episodeTitle);
            }

            return episode.toJSON();
        } catch (e) {
            logger.error(e);
            throw new ErrorHandler(e.status, e.message);
        }
    };
}

export default new EpisodeService();
