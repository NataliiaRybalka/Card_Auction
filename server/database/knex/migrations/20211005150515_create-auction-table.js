import {AUCTION, USER} from '../../../constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(AUCTION, table => {
        table.increments('id').primary();
        table.integer('lot_id');
        table.string('lot_type');
        table.integer('init_price');
        table.integer('max_price');
        table.integer('current_price');
        table.integer('min_step');
        table.integer('max_time');
        table.integer('min_extension_time');
        table.dateTime('created_at');
        table.string('status');
        table.integer('customer_id').unsigned();
        table.foreign('customer_id').references('id').inTable(USER);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(AUCTION);
};
