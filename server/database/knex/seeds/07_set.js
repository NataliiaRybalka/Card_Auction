import faker from 'faker';

import {SET} from '../../../constants/database.enum';

exports.seed = function(knex) {
  const sets = [];

  for (let i = 0; i < 4; i++) {
    sets.push({
      title: faker.random.word(),
      bonus: Math.round(Math.random() * (100 - 10) + 10),
    });
  }

  return knex(SET).del()
    .then(function () {
      return knex(SET).insert(sets);
    });
};
