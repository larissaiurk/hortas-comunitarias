import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Beterraba', image: '001-beetroot.png', category_id: 2 },
    { title: 'Cenoura', image: '002-carrot.png', category_id: 2 },
    { title: 'Maçã', image: '003-apple.png', category_id: 1 },
    { title: 'Laranja', image: '004-apricot.png', category_id: 1 },
    { title: 'Abacate', image: '005-avocado.png', category_id: 1 },
    { title: 'Banana', image: '006-bananas.png', category_id: 1 },
  ]);
};
