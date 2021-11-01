import {SET} from '#constants/database.enum';

exports.up = function(knex) {
  return knex.schema.createTable(SET, table => {
    table.increments('id').primary();
    table.string('title');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(SET);
};
