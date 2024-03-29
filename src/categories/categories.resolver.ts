import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dtos/category.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryInput } from './dtos/create-category.input';
import { GraphQLResolveInfo } from 'graphql';
import {
  PrismaRequest,
  PrismaResponse,
  PrismaResponseArray,
} from '../types/custom-types';
import { PrismaSelect } from '@paljs/plugins';
import { FindCategoryInput } from './dtos/find-category.input';
import { FindManyCategoriesInput } from './dtos/find-many-categories.input';
import { UpdateCategoryInput } from './dtos/update-category.input';
import { DeleteCategoryInput } from './dtos/delete-category.input';
import { Success } from '../dtos/success.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => CategoryDTO)
  @UsePipes(ValidationPipe)
  async CreateCategory(
    @Args('input') input: CreateCategoryInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<CreateCategoryInput> = {
      input,
      select,
    };

    return this.categoriesService.createCategory(request);
  }

  @Query(() => CategoryDTO)
  @UsePipes(ValidationPipe)
  async FindCategory(
    @Args() input: FindCategoryInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<FindCategoryInput> = {
      input,
      select,
    };

    return this.categoriesService.findCategory(request);
  }

  @Query(() => [CategoryDTO])
  @UsePipes(ValidationPipe)
  async FindManyCategories(
    @Args() input: FindManyCategoriesInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponseArray<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<FindManyCategoriesInput> = {
      input,
      select,
    };

    return this.categoriesService.findManyCategories(request);
  }

  @Mutation(() => CategoryDTO)
  @UsePipes(ValidationPipe)
  async UpdateCategory(
    @Args('input') input: UpdateCategoryInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<UpdateCategoryInput> = {
      input,
      select,
    };

    return this.categoriesService.updateCategory(request);
  }

  @Mutation(() => Success)
  @UsePipes(ValidationPipe)
  async DeleteCategory(
    @Args('input') input: DeleteCategoryInput,
  ): Promise<Success> {
    const request: PrismaRequest<DeleteCategoryInput> = {
      input,
      select: undefined,
    };

    return this.categoriesService.deleteCategory(request);
  }
}
