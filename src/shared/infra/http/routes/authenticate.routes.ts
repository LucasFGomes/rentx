import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/RefreshToken/RefreshTokenController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateUser = new AuthenticateUserController();
const refreshToken = new RefreshTokenController();

authenticateRoutes.post('/sessions', authenticateUser.handle);
authenticateRoutes.post('/refresh-token', refreshToken.handle);

export { authenticateRoutes };

