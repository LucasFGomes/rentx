import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = request.body;

    try {
      const createCarUseCase = container.resolve(CreateCarUseCase);

      const car = await createCarUseCase.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      });

      return response.status(201).json(car);
    } catch (e) {
      return response.status(e.statusCode).json({ error: e.message });
    }
  }
}

export { CreateCarController };

