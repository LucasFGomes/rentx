import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_ids } = request.body;

    try {
      const createCarSpecificationUseCase = container.resolve(
        CreateCarSpecificationUseCase,
      );

      const car = await createCarSpecificationUseCase.execute({
        car_id: id,
        specification_ids,
      });

      return response.status(201).json(car);
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  }
}

export { CreateCarSpecificationsController };
