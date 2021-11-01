const {databaseEnum: {ROLE}} = require('../../../constants');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(ROLE).del()
    .then(function () {
      // Inserts seed entries
      return knex(ROLE).insert([
        {title: 'admin'},
        {title: 'user'}
      ]);
    });
};
