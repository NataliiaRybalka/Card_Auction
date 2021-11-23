import faker from 'faker';

import {LOCATION} from '../../../constants/database.enum';

exports.seed = function(knex) {
  const locations = [];

  for (let i = 0; i < 3; i++) {
    locations.push({
      title: faker.address.country(),
      type: faker.random.word()
    });
  }

  return knex(LOCATION).del()
    .then(function () {
      return knex(LOCATION).insert(locations);
    });
};
