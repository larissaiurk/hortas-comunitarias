import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
    table.integer('category_id')
      .notNullable()
      .references('id')
      .inTable('items_category');    
  });
};

export async function down(knex: Knex) {
  return knex.schema.dropTable('items');
};