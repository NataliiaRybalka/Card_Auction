import faker from 'faker';

import {USER} from '../../../constants/database.enum';
import { hashPassword } from '../../../helpers/passwordHasher';

exports.seed = async function(knex) {
  const users = [];

  for (let i = 0; i < 5; i++) {
    const password = await hashPassword('123456');
    if (i === 0) {
      users.push({
        login: 'admin',
        email: 'admin@gmail.com',
        password,
        role_id: 1,
        image: faker.image.avatar(),
        created_at: faker.date.recent()
      });
    } else {
      users.push({
        login: faker.name.firstName(),
        email: faker.internet.email(),
        password,
        role_id: 2,
        image: faker.image.avatar(),
        created_at: faker.date.recent()
      });
    }
  }

  return knex(USER).del()
    .then(function () {
      return knex(USER).insert(users);
    });
};