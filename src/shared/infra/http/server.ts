import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';

import createConnection from '../typeorm';
import '@shared/container';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';

const app = express();

createConnection();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3000, () => console.log('Server is runnnig...'));
