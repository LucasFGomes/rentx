import auth from '@config/auth';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { secret_refresh_token } = auth;
  const authHeader = request.headers.authorization;

  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  try {
    const [, token] = authHeader.split(' ');

    const { sub: userId } = verify(token, secret_refresh_token) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token,
    );

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

