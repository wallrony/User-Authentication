import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('description').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('users');
}