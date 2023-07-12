import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dtos/category.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryInput } from './dtos/create-category.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';
import { PrismaSelect } from '@paljs/plugins';
import { FindCategoryInput } from './dtos/find-category.input';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => CategoryDTO)
  @UsePipes(ValidationPipe)
  async CreateCategory(
    @Args('input') input: CreateCategoryInput,
    @Info() info: GraphQLResolveInfo
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
    @Info() info: GraphQLResolveInfo
  ): PrismaResponse<CategoryDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<FindCategoryInput> = {
      input,
      select,
    };
    
    return this.categoriesService.findCategory(request);
  }

}
