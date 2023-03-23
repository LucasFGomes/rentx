import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase,
    );

    try {
      const rentals = await listRentalsByUserUseCase.execute(id);

      return response.status(200).json(rentals);
    } catch (e) {
      return response.status(503).json({ error: e.message });
    }
  }
}

export { ListRentalsByUserController };
