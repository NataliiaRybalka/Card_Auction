import {CARD, CARD_EPISODE, EPISODE} from '#constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(CARD_EPISODE, table => {
        table.increments('id').primary();
        table.integer('card_id').unsigned();
        table.foreign('card_id').references('id').inTable(CARD);
        table.integer('episode_id').unsigned();
        table.foreign('episode_id').references('id').inTable(EPISODE);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(CARD_EPISODE);
};
