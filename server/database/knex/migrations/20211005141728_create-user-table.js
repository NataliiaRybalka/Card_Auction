import {USER} from '../../../constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(USER, (table) => {
        table.increments('id').primary();
        table.string('login');
        table.string('email');
        table.string('password');
        table.integer('role_id').unsigned();
        table.foreign('role_id').references('id').inTable('role');
        table.integer('rating').defaultTo(0);
        table.dateTime('created_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(USER);
};
