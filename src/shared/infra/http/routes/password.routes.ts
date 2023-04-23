import { ResetPasswordController } from '@modules/accounts/useCases/ResetPassword/ResetPasswordController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
