
exports.up = function(knex) {
  return knex.schema.raw("CREATE VIEW `transaction_view` AS SELECT user_id, amount FROM `card-project`.transaction;");
};

exports.down = function(knex) {
  return knex.schema.raw("DROP VIEW `transaction_view`;");
};
