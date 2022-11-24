import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarImagesRepository } from '../ICarImagesRepository';

class CarImagesRepositoryInMemory implements ICarImagesRepository {
  private carImages: CarImage[] = [];

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, { car_id, image_name, created_at: new Date() });

    this.carImages.push(carImage);

    return carImage;
  }
}

export { CarImagesRepositoryInMemory };
