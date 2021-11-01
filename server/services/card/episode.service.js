import episodeRepository from '#repositories/card/episode.repository';

class EpisodeService {
    async createEpisode(episodeTitle, episodeAirDate, series) {
        let episode = await episodeRepository.getOneEpisodeByTitle(episodeTitle);
        if (!episode) {
            episode = await episodeRepository.createEpisode(episodeTitle, episodeAirDate, series);
            episode = await episodeRepository.getOneEpisodeByTitle(episodeTitle);
        }
        return episode.toJSON();
    };
}

export default new EpisodeService();