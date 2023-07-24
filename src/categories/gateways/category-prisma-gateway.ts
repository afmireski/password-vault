import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response, ResponseArray } from 'src/types/custom-types';
import { CategoryDTO } from '../dtos/category.dto';
import { CreateCategoryInput } from '../dtos/create-category.input';
import { DeleteCategoryInput } from '../dtos/delete-category.input';
import { FindCategoryByIdInput } from '../dtos/find-category-by-id.input';
import { FindManyCategoriesPrisma } from '../dtos/find-many-categories-prisma';
import { UpdateCategoryInput } from '../dtos/update-category.input';
import { CategoryPersistanceGateway } from './category-persistance-gateway.interface';

@Injectable()
export class CategoryPrismaGateway implements CategoryPersistanceGateway {
  constructor(private readonly prisma: PrismaService) {}

  async create(request: Request<CreateCategoryInput>): Response<CategoryDTO> {
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

  async findById(
    request: Request<FindCategoryByIdInput>,
  ): Response<CategoryDTO> {
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

  async findAllByUser(
    request: Request<FindManyCategoriesPrisma>,
  ): ResponseArray<CategoryDTO> {
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

  async update(request: Request<UpdateCategoryInput>): Response<CategoryDTO> {
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

  async delete(request: Request<DeleteCategoryInput>): Promise<void> {
    const {
      input: { category_id, user_id },
    } = request;

    await this.prisma.category
      .delete({
        where: {
          id: category_id,
          user_id: user_id,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Houve uma falha ao tentar apagar a categoria!',
        );
      });
  }
}
