import { Request, Response } from 'express';
import knex from '../database/connections';

class ItemsController {
  async index (request: Request, response: Response) {
    const items = await knex('items').select('*');
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        image_url: `http://10.0.0.20:3333/uploads/${item.image}`,
        title: item.title, 
      }
    });
  
    response.json(serializedItems);
  }
}

export default ItemsController;