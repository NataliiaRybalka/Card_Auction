import {CHAT, USER} from '../../../constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(CHAT, table => {
        table.increments('id').primary();
        table.integer('from').unsigned();
        table.foreign('from').references('id').inTable(USER);
        table.integer('to').unsigned();
        table.foreign('to').references('id').inTable(USER);
        table.string('message');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(CHAT);
};
