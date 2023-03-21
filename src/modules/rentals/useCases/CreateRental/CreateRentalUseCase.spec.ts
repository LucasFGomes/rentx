import dayjs from 'dayjs';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let carsRepositoyInMemory: ICarsRepository;
let rentalsRepositoryInMemory: IRentalsRepository;
let dayjsDateProvider: IDateProvider;
let createRentalUseCase: CreateRentalUseCase;

let car1: Car;
let car2: Car;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoyInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoyInMemory,
    );

    car1 = await carsRepositoyInMemory.create({
      id: 'car_test_id',
      name: 'Car Test',
      description: 'Description Test',
      daily_rate: 60,
      license_plate: 'AAA4F78',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: 'category_test',
    });

    car2 = await carsRepositoyInMemory.create({
      id: 'car_test_2_id',
      name: 'Car Test 2',
      description: 'Description Test',
      daily_rate: 60,
      license_plate: 'BBB4F78',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: 'category_test',
    });
  });

  it('should be abled to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: car1.id,
      user_id: '123AB',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be possible to register a new lease if there is already one open for the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car1.id,
        user_id: 'user_test',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: car2.id,
        user_id: 'user_test',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to register a new lease if there is already one open for the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car1.id,
        user_id: 'user_test_1',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: car1.id,
        user_id: 'user_test_2',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be abled to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car1.id,
        user_id: 'user_test_1',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
