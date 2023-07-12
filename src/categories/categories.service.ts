import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaRequest, PrismaResponse, PrismaResponseArray } from 'src/types/custom-types';
import { CreateCategoryInput } from './dtos/create-category.input';
import { CategoryDTO } from './dtos/category.dto';
import { FindCategoryInput } from './dtos/find-category.input';
import { FindManyCategoriesInput } from './dtos/find-many-categories.input';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(
    request: PrismaRequest<CreateCategoryInput>,
  ): PrismaResponse<CategoryDTO> {
    const {
      input: { user_id, name },
      select,
    } = request;

    return Promise.resolve(
      this.prisma.category.create({
        data: {
          user_id,
          name,
        },
        ...select,
      }),
    ).catch(() => {
      throw new InternalServerErrorException(
        'Houve uma falha ao criar a categoria',
      );
    });
  }

  async findCategory(
    request: PrismaRequest<FindCategoryInput>,
  ): PrismaResponse<CategoryDTO> {
    const {
      input: { category_id },
      select,
    } = request;

    return Promise.resolve(
      this.prisma.category.findFirstOrThrow({
        where: {
          id: {
            equals: category_id,
          },
        },
        ...select,
      }),
    ).catch(() => {
      throw new InternalServerErrorException('Categoria não encontrada');
    });
  }

  async findManyCategories(
    request: PrismaRequest<FindManyCategoriesInput>,
  ): PrismaResponseArray<CategoryDTO> {
    const {
      input: {
        user_id,
        where,
        orderBy,
        pagination: { skip, take },
      },
      select,
    } = request;

    return Promise.resolve(
      this.prisma.category.findMany({
        where: {
          ...where,
          user_id: {
            equals: user_id,
          },
        },
        orderBy,
        skip,
        take,
        ...select,
      }),
    );
  }

  async updateCategory(request: PrismaRequest<UpdateCategoryInput>): PrismaResponse<CategoryDTO> {
    
  }
}
