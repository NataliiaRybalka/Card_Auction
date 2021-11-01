import { CARD_SET } from "#constants/database.enum";

exports.up = function(knex) {
  return knex.schema.table(CARD_SET, table => {
    table.integer('bonus');
  })
};

exports.down = function(knex) {
  return knex.schema.table(CARD_SET, table => {
    table.dropColumn('bonus')
  })
};
