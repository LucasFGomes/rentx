import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositoryInMemory: ISpecificationsRepository;

describe('Create Car Specification', () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should not be able to add a new specification to an car not existent', async () => {
    const car_id = '1234';
    const specification_ids = ['121212'];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specification_ids,
      }),
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });

  it('should be able to add a new specification to an car existent', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 1',
      description: 'Description Test',
      daily_rate: 60,
      license_plate: 'YXX4F78',
      fine_amount: 10,
      brand: 'Brand Test',
      category_id: 'category_test',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Test',
      description: 'Description Test',
    });

    const specification_ids = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_ids,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});

