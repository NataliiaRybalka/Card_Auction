import {TRANSACTION, USER} from '#constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(TRANSACTION, table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable(USER);
        table.dateTime('created_at');
        table.decimal('amount');
        table.index('amount')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(TRANSACTION);
};
