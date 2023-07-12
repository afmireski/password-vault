import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';
import { CreateCategoryInput } from './dtos/create-category.input';
import { CategoryDTO } from './dtos/category.dto';

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
        throw new InternalServerErrorException("Houve uma falha ao criar a categoria");
    });
  }
}
