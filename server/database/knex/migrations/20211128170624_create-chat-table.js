import {CHAT, CHAT_LIST, USER} from '../../../constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(CHAT, table => {
        table.increments('id').primary();
        table.integer('from').unsigned();
        table.foreign('from').references('id').inTable(USER);
        table.integer('to').unsigned();
        table.foreign('to').references('id').inTable(USER);
        table.integer('chat_id').unsigned();
        table.foreign('chat_id').references('id').inTable(CHAT_LIST);
        table.string('message');
        table.dateTime('created_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(CHAT);
};
