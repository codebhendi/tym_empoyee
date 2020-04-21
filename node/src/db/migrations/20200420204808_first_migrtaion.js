
exports.up = knex => (
  knex.schema
    .createTable('employee', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.bool('is_activated').notNullable();
      table.timestamp('created_at').notNullable();
      table.jsonb('assigned_surveys').notNullable();
    })
    .createTable('survey', (table) => {
      table.increments('id').primary();
      table.bool('is_activated').notNullable();
      table.timestamp('created_at').notNullable();
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('survey')
    .dropTable('employee')
);
