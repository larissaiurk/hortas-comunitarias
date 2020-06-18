import { Request, Response } from 'express';
import knex from '../database/connections';

require('dotenv/config');

class ItemsPointController {
  async show (request: Request, response: Response) {
    const { id } = request.params;

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        image_url: `${process.env.SERVER_ENDPOINT}/uploads/items/${item.image}`,
        title: item.title, 
        category: item.category_id,
      }
    })     

    return response.json({ serializedItems })
  }  

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { items } = request.body;
    console.log(items);
    try {
      const itemsPoint = await knex('point_items')
        .where('point_items.point_id', id)

      if(itemsPoint) {
        await knex('point_items').where('point_items.point_id', id).delete();         
      }
      
      const trx = await knex.transaction();

      const pointItems = items
        .split(',') //separar por vírgula
        .map((item: string) => Number(item.trim())) //trim - retira o espaço e converte para número
        .map((item_id: number) => {
          return {
            item_id,
            point_id: Number(id),
          }
      });

      await trx('point_items').insert(pointItems);
      
      await trx.commit();

      response.json({
        pointItems
      });
    }
    catch (e) {
      // declarações para manipular quaisquer exceções
      console.log(e); // passa o objeto de exceção para o manipulador de erro
    }

  }    


}

export default ItemsPointController;