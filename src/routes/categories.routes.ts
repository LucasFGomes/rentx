import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoryRepository);
  const category = createCategoryService.execute({ name, description });

  return response.status(201).json({ category });
});

categoriesRoutes.get('/', (request, response) => {
  const allCategories = categoryRepository.list();

  return response.status(200).json(allCategories);
});

export { categoriesRoutes };
