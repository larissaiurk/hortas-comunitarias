import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items_category').insert([
    { title: 'Fruta' },
    { title: 'Legume' },
    { title: 'Verdura' },
    { title: 'Outros' },
  ]);
};
