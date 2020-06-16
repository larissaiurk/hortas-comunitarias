import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('items_category', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
  });
};

export async function down(knex: Knex) {
  return knex.schema.dropTable('items_category');
};