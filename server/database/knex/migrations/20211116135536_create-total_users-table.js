import {TOTAL_USERS} from '../../../constants/database.enum';

exports.up = function(knex) {
  return knex.schema.createTable(TOTAL_USERS, (table) => {
    table.increments('id').primary();
    table.integer('total');
    table.date('created_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TOTAL_USERS);
};
