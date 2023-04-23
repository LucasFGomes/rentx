import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: IUsersRepository;
let userTokensRepositoryInMemory: IUserTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should to be able send forgot password mail to user', async () => {
    const sendEmail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '187804',
      email: 'sibo@sauv.pt',
      name: 'Charlotte Townsend',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('sibo@sauv.pt');

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should to be able to send an email if user does not exists', async () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute('gof@inujenof.be');
    }).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should to be able to create an user tokens', async () => {
    const generateTokenMail = jest.spyOn(
      userTokensRepositoryInMemory,
      'create',
    );

    await usersRepositoryInMemory.create({
      driver_license: '961797',
      email: 'takeifi@alodahuk.im',
      name: 'Terry Davis',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('takeifi@alodahuk.im');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
