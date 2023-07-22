import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dtos/category.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryInput } from './dtos/create-category.input';
import { GraphQLResolveInfo } from 'graphql';
import { Request, Response, ResponseArray } from '../types/custom-types';
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
  ): Response<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<CreateCategoryInput> = {
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
  ): Response<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<FindCategoryInput> = {
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
  ): ResponseArray<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<FindManyCategoriesInput> = {
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
  ): Response<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<UpdateCategoryInput> = {
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
    const request: Request<DeleteCategoryInput> = {
      input,
      select: undefined,
    };

    return this.categoriesService.deleteCategory(request);
  }
}
