import { CreateRentalController } from '@modules/rentals/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/DevolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalsRoutes };

