import {CHAT_LIST, USER} from '../../../constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(CHAT_LIST, table => {
        table.increments('id').primary();
        table.integer('from').unsigned();
        table.foreign('from').references('id').inTable(USER);
        table.integer('to').unsigned();
        table.foreign('to').references('id').inTable(USER);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(CHAT_LIST);
};
