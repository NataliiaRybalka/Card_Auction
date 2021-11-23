import faker from 'faker';

import {EPISODE} from '../../../constants/database.enum';

exports.seed = function(knex) {
  const episodes = [];
  
  for (let i = 0; i < 3; i++) {
    episodes.push({
      title: faker.random.word(),
      air_date: faker.date.past(),
      series: faker.datatype.number()
    });
  }

  return knex(EPISODE).del()
    .then(function () {
      return knex(EPISODE).insert(episodes);
    });
};
