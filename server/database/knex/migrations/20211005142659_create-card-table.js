import {CARD} from '#constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(CARD, table => {
        table.increments('id').primary();
        table.string('name');
        table.boolean('is_alive');
        table.string('species');
        table.string('type');
        table.string('gender');
        table.integer('location_id').unsigned();
        table.foreign('location_id').references('id').inTable('location');
        table.string('image');
        table.dateTime('created_at');
        table.integer('times_sold');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(CARD);
};
