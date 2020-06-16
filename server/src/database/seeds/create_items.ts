import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Beterraba', image: '001-beetroot.png' },
    { title: 'Cenoura', image: '002-carrot.png' },
    { title: 'Maçã', image: '003-apple.png' },
    { title: 'Laranja', image: '004-apricot.png' },
    { title: 'Abacate', image: '005-avocado.png' },
    { title: 'Banana', image: '006-bananas.png' },
  ]);
};
