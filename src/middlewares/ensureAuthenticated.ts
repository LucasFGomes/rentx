import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';
import { AppError } from '../errors/AppError';
import { IUsersRepository } from '../modules/accounts/repositories/IUsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  try {
    const [, token] = authHeader.split(' ');

    const { sub: userId } = verify(
      token,
      'c6e3663949540460865233d0838ab7ec',
    ) as IPayload;

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
