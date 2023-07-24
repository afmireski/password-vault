import { PaginationInterface } from 'src/dtos/pagination.input';
import { FindManyCategoriesInput } from './find-many-categories.input';

export class FindManyCategoriesPrisma implements FindManyCategoriesInput {
  user_id: string;

  where: any;

  orderBy: any;

  pagination: PaginationInterface;
}
