import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    try {
      const images_name = images.map(image => image.filename);

      const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

      await uploadCarImageUseCase.execute({
        car_id: id,
        images_name,
      });

      return response.status(201).send();
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  }
}

export { UploadCarImagesController };
