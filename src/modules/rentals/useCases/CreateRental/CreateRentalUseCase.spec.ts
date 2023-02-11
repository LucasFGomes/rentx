import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let rentalsRepositoryInMemory: IRentalsRepository;
let dayjsDateProvider: IDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it('should be abled to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: 'AABBCC',
      user_id: '123AB',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be possible to register a new lease if there is already one open for the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car_test_1',
        user_id: 'user_test',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: 'car_test_2',
        user_id: 'user_test',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to register a new lease if there is already one open for the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car_test',
        user_id: 'user_test_1',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: 'car_test',
        user_id: 'user_test_2',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be abled to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'car_test',
        user_id: 'user_test_1',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
