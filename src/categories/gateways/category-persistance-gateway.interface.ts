import { Request } from 'src/types/custom-types';
import { CategoryDTO } from '../dtos/category.dto';
import { CreateCategoryInput } from '../dtos/create-category.input';
import { FindCategoryByIdInput } from '../dtos/find-category-by-id.input';

export interface CategoryPersistanceGateway {
  create(request: Request<CreateCategoryInput>): Promise<CategoryDTO>;

  findById(request: Request<FindCategoryByIdInput>): Promise<CategoryDTO>;
}
