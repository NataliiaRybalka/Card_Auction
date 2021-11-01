import {LOCATION} from '#constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(LOCATION, table => {
        table.increments('id').primary();
        table.string('title');
        table.string('type');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(LOCATION);
};
