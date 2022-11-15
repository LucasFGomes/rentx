import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should to be able list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car_test',
      description: 'description_test',
      daily_rate: 140,
      license_plate: 'XYZ0000',
      fine_amount: 100,
      brand: 'brand_test',
      category_id: 'category_test',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should to be able list all available cars when filtered by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car_test_2',
      description: 'description_test',
      daily_rate: 140,
      license_plate: 'XYZ1111',
      fine_amount: 100,
      brand: 'brand_test_2',
      category_id: 'category_test_2',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'car_test_2' });

    expect(cars).toEqual([car]);
  });

  it('should to be able list all available cars when filtered by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car_test_3',
      description: 'description_test',
      daily_rate: 140,
      license_plate: 'XYZ1111',
      fine_amount: 100,
      brand: 'brand_test_3',
      category_id: 'category_test_3',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'brand_test_3',
    });

    expect(cars).toEqual([car]);
  });

  it('should to be able list all available cars when filtered by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car_test_4',
      description: 'description_test',
      daily_rate: 140,
      license_plate: 'XYZ1111',
      fine_amount: 100,
      brand: 'brand_test_4',
      category_id: 'category_test_4',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_test_4',
    });

    expect(cars).toEqual([car]);
  });
});
