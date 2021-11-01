import {CARD, CARD_SET, SET} from '#constants/database.enum';

exports.up = function(knex) {
  return knex.schema.createTable(CARD_SET, table => {
    table.integer('card_id').unsigned();
    table.foreign('card_id').references('id').inTable(CARD);
    table.integer('set_id').unsigned();
    table.foreign('set_id').references('id').inTable(SET);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(CARD_SET);
};
