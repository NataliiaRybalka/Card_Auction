import {CARD_EPISODE} from '../../../constants/database.enum';

exports.seed = function(knex) {
  const cardEpisodes = [];

  for (let i = 0; i < 5; i++) {
    cardEpisodes.push({
      card_id: i + 1,
      episode_id: Math.round(Math.random() * (3 - 1) + 1),
    });
  }
  
  return knex(CARD_EPISODE).del()
    .then(function () {
      return knex(CARD_EPISODE).insert(cardEpisodes);
    });
};
