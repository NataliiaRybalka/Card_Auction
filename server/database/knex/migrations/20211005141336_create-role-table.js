import {ROLE} from '../../../constants/database.enum';

exports.up = function(knex) {
    return knex.schema.createTable(ROLE, (table) => {
        table.increments('id').primary();
        table.string('title');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(ROLE);
};
