import faker from 'faker';

import {CARD_SET} from '../../../constants/database.enum';

exports.seed = function(knex) {
  const cardSets = [];

  for (let i = 0; i < 5; i++) {
    cardSets.push({
      card_id: i + 1,
      set_id: Math.round(Math.random() * (4 - 1) + 1),
    });
  }

  return knex(CARD_SET).del()
    .then(function () {
      return knex(CARD_SET).insert(cardSets);
    });
};
