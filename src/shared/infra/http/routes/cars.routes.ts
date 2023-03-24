import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/CreateCarSpecification/CreateCarsSpecificationsController';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/UploadCarImages/UploadCarImagesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const uploadCarImages = multer(uploadConfig.upload('./tmp/car_images'));

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
  '/images/:id',
  uploadCarImages.array('files'),
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImagesController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };

