import {USER, USER_TOKEN} from '#constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(USER_TOKEN, table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable(USER);
        table.string('access_token');
        table.string('refresh_token');
        table.integer('expiresIn');
        table.dateTime('created_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(USER_TOKEN);
};
