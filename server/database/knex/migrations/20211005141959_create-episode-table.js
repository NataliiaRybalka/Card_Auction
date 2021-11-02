import {EPISODE} from '../../../constants/database.enum';

exports.up = function(knex) {
  return knex.schema.createTable(EPISODE, table => {
      table.increments('id').primary();
      table.string('title');
      table.string('air_date');
      table.string('series');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(EPISODE);
};
