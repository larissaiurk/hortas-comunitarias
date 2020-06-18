import express from 'express';

import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import ItemsPointController from './controllers/ItemsPointController';
import CategoriesController from './controllers/CategoriesController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
const itemsPointController = new ItemsPointController();
const categoriesController = new CategoriesController();

routes.get('/categories', categoriesController.index);

routes.get('/items', itemsController.index);

routes.get('/items-point/:id', itemsPointController.show);
routes.put('/items-point/:id', itemsPointController.update);

routes.get('/points/:id', pointsController.show);
routes.get('/points/', pointsController.index);

routes.post(
  '/points', 
  upload.single('image'), 
  celebrate ({
    body: Joi.object().keys({
      name: Joi.string().required(),
      responsibleName: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(), //pode adicionar um regex aqui
    })
  },{
    abortEarly: false,
  }),
  pointsController.create
);

routes.put('/points/:id', pointsController.update);

routes.delete('/points/:id', pointsController.delete);


export default routes;
