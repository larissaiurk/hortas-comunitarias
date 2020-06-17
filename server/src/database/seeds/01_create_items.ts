import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Beterraba', image: '001-beetroot.png', category_id: 2 },
    { title: 'Cenoura', image: '002-carrot.png', category_id: 2 },
    { title: 'Maçã', image: '003-apple.png', category_id: 1 },
    { title: 'Laranja', image: '004-apricot.png', category_id: 1 },
    { title: 'Abacate', image: '005-avocado.png', category_id: 1 },
    { title: 'Banana', image: '006-bananas.png', category_id: 1 },
    { title: 'Pimentão Verde', image: '007-Bell pepper.png', category_id: 2 },
    { title: 'Cereja', image: '008-berry.png', category_id: 1 },
    { title: 'Blueberry', image: '009-blueberry.png', category_id: 1 },
    { title: 'Berinjela', image: '016-eggplant.png', category_id: 2 },
    { title: 'Brócolis', image: '011-broccoli.png', category_id: 3 },
    { title: 'Pimentão Amarelo', image: '012-Capsicum.png', category_id: 2 },
    { title: 'Couve Flor', image: '013-cauliflower.png', category_id: 3 },
    { title: 'Milho', image: '014-corn.png', category_id: 2 },
    { title: 'Alho', image: '017-garlic.png', category_id: 2 }, //verificar categoria
    { title: 'Pimenta Verde', image: '018-green chili pepper.png', category_id: 2 },
    { title: 'Limão', image: '020-lemon.png', category_id: 1 }, //verificar categoria
    { title: 'Manga', image: '021-mango.png', category_id: 1 },        
    { title: 'Laranja', image: '022-orange.png', category_id: 1 },  
    { title: 'Mamão', image: '023-papaya.png', category_id: 1 },    
    { title: 'Pêra', image: '024-pear.png', category_id: 1 },  
    { title: 'Abobora', image: '026-pumpkin.png', category_id: 2 },       
    { title: 'Morango', image: '028-strawberry.png', category_id: 1 },       
    { title: 'Tomate', image: '029-tomato.png', category_id: 2 },       
    { title: 'Melancia', image: '030-watermelon.png', category_id: 1 },  
    { title: 'Alface', image: '008-lettuce.png', category_id: 3 },  //reduzir
    { title: 'Mel', image: '031-mel.png', category_id: 4 },  //reduzir    
  ]);
};
