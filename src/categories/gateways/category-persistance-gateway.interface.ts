import { Request } from 'src/types/custom-types';
import { CreateCategoryInput } from '../dtos/create-category.input';

export interface CategoryPersistanceGateway {
  create(request: Request<CreateCategoryInput>): Promise<void>;
}
