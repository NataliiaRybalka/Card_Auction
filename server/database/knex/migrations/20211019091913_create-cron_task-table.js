import {CRON_TASK, USER} from '../../../constants/database.enum';

exports.up = function(knex) {
  return knex.schema.createTable(CRON_TASK, table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().defaultTo(null);
    table.foreign('user_id').references('id').inTable(USER);
    table.dateTime('created_at');
    table.string('status');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(CRON_TASK);
};
