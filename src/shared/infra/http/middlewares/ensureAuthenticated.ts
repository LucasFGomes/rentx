import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { secret_token } = auth;
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  try {
    const [, token] = authHeader.split(' ');

    const { sub: userId } = verify(token, secret_token) as IPayload;

    const usersRepository =
      container.resolve<IUsersRepository>('UsersRepository');

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid token!', 401);
  }
}

