import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateUser = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUser.handle);

export { authenticateRoutes };
