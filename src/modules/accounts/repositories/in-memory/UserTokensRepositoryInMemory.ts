import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUserTokensRepository } from '../IUserTokensRepository';

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export { UserTokensRepositoryInMemory };
