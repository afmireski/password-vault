import { Request, Response, ResponseArray } from 'src/types/custom-types';
import { CategoryDTO } from '../dtos/category.dto';
import { CreateCategoryInput } from '../dtos/create-category.input';
import { FindCategoryByIdInput } from '../dtos/find-category-by-id.input';
import { FindManyCategoriesInput } from '../dtos/find-many-categories.input';

export interface CategoryPersistanceGateway {
  create(request: Request<CreateCategoryInput>): Response<CategoryDTO>;

  findById(request: Request<FindCategoryByIdInput>): Response<CategoryDTO>;

  findAllByUser(
    request: Request<FindManyCategoriesInput>,
  ): ResponseArray<CategoryDTO>;
}
