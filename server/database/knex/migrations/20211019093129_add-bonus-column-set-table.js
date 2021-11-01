import {SET} from '#constants/database.enum';

exports.up = function(knex) {
  return knex.schema.table(SET, table => {
    table.integer('bonus');
  })
};

exports.down = function(knex) {
  return knex.schema.dropColumn('bonus');
};
