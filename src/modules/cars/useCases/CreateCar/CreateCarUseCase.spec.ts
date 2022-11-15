import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should to be able a create car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'Description Test',
      daily_rate: 60,
      license_plate: 'AAA4F78',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: 'category_test',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Test 1',
        description: 'Description Test',
        daily_rate: 60,
        license_plate: 'YXX4F78',
        fine_amount: 10,
        brand: 'Brand Test',
        category_id: 'category_test',
      });

      await createCarUseCase.execute({
        name: 'Car Test 2',
        description: 'Description Test',
        daily_rate: 60,
        license_plate: 'YXX4F78',
        fine_amount: 10,
        brand: 'Brand Test',
        category_id: 'category_test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'CarTest',
      description: 'Description Test',
      daily_rate: 60,
      license_plate: 'YYY4F78',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: 'category_test',
    });

    expect(car.available).toBe(true);
  });
});
