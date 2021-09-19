import { Request, Response } from 'express';
import knex from '../database/connections';

class PointsController {
  async index (request: Request, response: Response) {
    const { city, uf, items } = request.query;
    
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `${process.env.SERVER_ENDPOINT}/uploads/${point.image}`
      }
    })

    return response.json(serializedPoints);
  }

  async show (request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point){
      return response.status(400).json({ message: 'Point not found' })
    }

    const serializedPoint = {
      ...point,
      image_url: `${process.env.SERVER_ENDPOINT}/uploads/${point.image}`
    }

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

    return response.json({ serializedPoint, serializedItems })
  }

  async create (request: Request, response: Response) {
    const {
      name, 
      responsibleName,
      email, 
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    const trx = await knex.transaction();

    const point = {
      image: request?.file?.filename ? request?.file?.filename : '' ,
      name, 
      responsibleName,
      email, 
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };
  
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItems = items
      .split(',') //separar por vírgula
      .map((item: string) => Number(item.trim())) //trim - retira o espaço e converte para número
      .map((item_id: number) => {
        return {
          item_id,
          point_id: point_id,
        }
    });
  
    await trx('point_items').insert(pointItems);
    
    await trx.commit();
    
    response.json({
      id: point_id,
      ...point
    });
  } 

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, responsibleName, email, whatsapp } = request.body;
    knex('points')
      .where({id}) 
      .update({ name, responsibleName, email, whatsapp })
      .then(u => response.status(!!u?200:404).json({success:!!u}))
      .catch(e => response.status(500).json(e));
  }  

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    
    await knex('points').where('id', id).delete();

    return response.status(204).send();    
  }   
}

export default PointsController;