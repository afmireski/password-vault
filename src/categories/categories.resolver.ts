import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoryGraphQLDTO } from './dtos/category-graphql.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryGraphQLInput } from './dtos/create-category-graphql.input';
import { GraphQLResolveInfo } from 'graphql';
import { Request, Response, ResponseArray } from '../types/custom-types';
import { PrismaSelect } from '@paljs/plugins';
import { FindCategoryGraphQLInput } from './dtos/find-category-graphql.input';
import { FindManyCategoriesGraphQLInput } from './dtos/find-many-categories-graphql.input';
import { UpdateCategoryGraphQLInput } from './dtos/update-category-graphql.input';
import { DeleteCategoryGraphQLInput } from './dtos/delete-category-graphql.input';
import { Success } from '../dtos/success.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => CategoryGraphQLDTO)
  @UsePipes(ValidationPipe)
  async CreateCategory(
    @Args('input') input: CreateCategoryGraphQLInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<CategoryGraphQLDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<CreateCategoryGraphQLInput> = {
      input,
      select,
    };

    return this.categoriesService.createCategory(request);
  }

  @Query(() => CategoryGraphQLDTO)
  @UsePipes(ValidationPipe)
  async FindCategory(
    @Args() input: FindCategoryGraphQLInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<CategoryGraphQLDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<FindCategoryGraphQLInput> = {
      input,
      select,
    };

    return this.categoriesService.findCategory(request);
  }

  @Query(() => [CategoryGraphQLDTO])
  @UsePipes(ValidationPipe)
  async FindManyCategories(
    @Args() input: FindManyCategoriesGraphQLInput,
    @Info() info: GraphQLResolveInfo,
  ): ResponseArray<CategoryGraphQLDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<FindManyCategoriesGraphQLInput> = {
      input,
      select,
    };

    return this.categoriesService.findManyCategories(request);
  }

  @Mutation(() => CategoryGraphQLDTO)
  @UsePipes(ValidationPipe)
  async UpdateCategory(
    @Args('input') input: UpdateCategoryGraphQLInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<CategoryGraphQLDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<UpdateCategoryGraphQLInput> = {
      input,
      select,
    };

    return this.categoriesService.updateCategory(request);
  }

  @Mutation(() => Success)
  @UsePipes(ValidationPipe)
  async DeleteCategory(
    @Args('input') input: DeleteCategoryGraphQLInput,
  ): Promise<Success> {
    const request: Request<DeleteCategoryGraphQLInput> = {
      input,
      select: undefined,
    };

    await this.categoriesService.deleteCategory(request);

    return { success: true };
  }
}
