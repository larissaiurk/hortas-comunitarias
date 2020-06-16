import { Request, Response } from 'express';
import knex from '../database/connections';

require('dotenv/config');

class CategoriesController {
  async index (request: Request, response: Response) {
    const items = await knex('items_category').select('*');
  
    response.json(items);
  }
}

export default CategoriesController;