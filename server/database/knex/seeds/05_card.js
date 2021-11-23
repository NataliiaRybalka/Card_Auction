import faker from 'faker';

import {CARD} from '../../../constants/database.enum';

exports.seed = function(knex) {
  const cards = [];

  for (let i = 0; i < 5; i++) {
    cards.push({
      name: faker.animal.type(),
      is_alive: (i % 2 === 0) ? true : false,
      species: faker.random.word(),
      gender: faker.name.gender(),
      location_id: Math.round(Math.random() * (3 - 1) + 1),
      image: faker.image.animals(),
      created_at: faker.date.recent()
    });
  }

  return knex(CARD).del()
    .then(function () {
      return knex(CARD).insert(cards);
    });
};
