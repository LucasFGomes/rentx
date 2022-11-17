import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/CreateCarSpecification/CreateCarsSpecificationsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationsController =
  new CreateCarSpecificationsController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
