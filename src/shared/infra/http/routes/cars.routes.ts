import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/CreateCarSpecification/CreateCarsSpecificationsController';
import { UploadCarImagesController } from '@modules/cars/useCases/UploadCarImages/UploadCarImagesController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationsController =
  new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();
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

carsRoutes.post(
  '/images',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImagesController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
