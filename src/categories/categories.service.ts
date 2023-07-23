import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response, ResponseArray } from '../types/custom-types';
import { CreateCategoryGraphQLInput } from './dtos/create-category-graphql.input';
import { CategoryGraphQLDTO } from './dtos/category-graphql.dto';
import { FindCategoryGraphQLInput } from './dtos/find-category-graphql.input';
import { FindManyCategoriesGraphQLInput } from './dtos/find-many-categories-graphql.input';
import { UpdateCategoryInput } from './dtos/update-category.input';
import { DeleteCategoryInput } from './dtos/delete-category.input';
import { Success } from 'src/dtos/success.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(
    request: Request<CreateCategoryGraphQLInput>,
  ): Response<CategoryGraphQLDTO> {
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
    request: Request<FindCategoryGraphQLInput>,
  ): Response<CategoryGraphQLDTO> {
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
    request: Request<FindManyCategoriesGraphQLInput>,
  ): ResponseArray<CategoryGraphQLDTO> {
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

  async updateCategory(
    request: Request<UpdateCategoryInput>,
  ): Response<CategoryGraphQLDTO> {
    const {
      input: { user_id, category_id, name },
      select,
    } = request;

    return Promise.resolve(
      this.prisma.category.findFirst({
        where: {
          id: {
            equals: category_id,
          },
          user_id: {
            equals: user_id,
          },
          deleted_at: null,
        },
      }),
    ).then((category) => {
      if (!category) {
        throw new BadRequestException('Categoria não encontrada');
      }
      return this.prisma.category
        .update({
          where: {
            id: category_id,
          },
          data: {
            name: name,
            updated_at: new Date(),
          },
          ...select,
        })
        .catch(() => {
          throw new InternalServerErrorException(
            'Falha ao atualizar a categoria',
          );
        });
    });
  }

  async deleteCategory(
    request: Request<DeleteCategoryInput>,
  ): Promise<Success> {
    const {
      input: { category_id, user_id },
    } = request;

    return Promise.resolve(
      this.prisma.category.delete({
        where: {
          id: category_id,
          user_id: user_id,
        },
      }),
    )
      .then(() => ({ success: true }))
      .catch(() => {
        throw new InternalServerErrorException(
          'Houve uma falha ao tentar apagar a categoria!',
        );
      });
  }
}
