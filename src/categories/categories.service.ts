import { Inject, Injectable } from '@nestjs/common';
import { Request, Response, ResponseArray } from '../types/custom-types';
import { CategoryDTO } from './dtos/category.dto';
import { CreateCategoryInput } from './dtos/create-category.input';
import { DeleteCategoryInput } from './dtos/delete-category.input';
import { FindCategoryByIdInput } from './dtos/find-category-by-id.input';
import { FindManyCategoriesInput } from './dtos/find-many-categories.input';
import { UpdateCategoryInput } from './dtos/update-category.input';
import { CategoryPersistanceGateway } from './gateways/category-persistance-gateway.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoryPersistanceGateway')
    private readonly categoryGateway: CategoryPersistanceGateway,
  ) {}

  async createCategory(
    request: Request<CreateCategoryInput>,
  ): Response<CategoryDTO> {
    return await this.categoryGateway.create(request);
  }

  async findCategory(
    request: Request<FindCategoryByIdInput>,
  ): Response<CategoryDTO> {
    return await this.categoryGateway.findById(request);
  }

  async findManyCategories(
    request: Request<FindManyCategoriesInput>,
  ): ResponseArray<CategoryDTO> {
    return await this.categoryGateway.findAllByUser(request);
  }

  async updateCategory(
    request: Request<UpdateCategoryInput>,
  ): Response<CategoryDTO> {
    return await this.categoryGateway.update(request);
  }

  async deleteCategory(request: Request<DeleteCategoryInput>): Promise<void> {
    await this.categoryGateway.delete(request);
  }
}
