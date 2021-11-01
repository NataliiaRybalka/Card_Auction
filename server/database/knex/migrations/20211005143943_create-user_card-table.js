import {CARD, USER, USER_CARD} from '../../../constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(USER_CARD, table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable(USER);
        table.integer('card_id').unsigned();
        table.foreign('card_id').references('id').inTable(CARD);
        table.integer('price_bought');
        table.dateTime('bought_at');
        table.integer('price_sold');
        table.dateTime('sold_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(USER_CARD);
};
