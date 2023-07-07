import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import * as bcrypt from 'bcrypt';
import { User } from '../../prisma/@generated/user/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaRequest, PrismaResponse } from '../types/custom-types';
import { CreateUserInput } from './dtos/create-user.input';
import { FindUserInput } from './dtos/find-user.input';
import { UpdateUserInput } from './dtos/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: CreateUserInput, select: any): PrismaResponse<User> {
    const { email, name, password } = input;

    const salt = bcrypt.genSaltSync(10);

    return Promise.resolve(
      this.prisma.extension.user.create({
        data: {
          email,
          name,
          password: bcrypt.hashSync(password, salt),
        },
        ...select,
      }),
    ).catch(() => {
      throw new InternalServerErrorException('Falha ao criar o usuário');
    });
  }

  async findUser(request: PrismaRequest<FindUserInput>): PrismaResponse<User> {
    const { input, select } = request;
    const { user_id } = input;

    return Promise.resolve(
      this.prisma.user.findFirstOrThrow({
        where: {
          id: {
            equals: user_id,
          },
        },
        ...select,
      }),
    ).catch(() => {
      throw new BadRequestException('Usuário não encontrado');
    });
  }

  async updateUser(
    request: PrismaRequest<UpdateUserInput>,
  ): PrismaResponse<User> {
    const { input, select } = request;
    const { user_id, name, email } = input;

    return Promise.resolve(
      this.prisma.user
        .findFirstOrThrow({
          where: {
            id: {
              equals: user_id,
            },
          },
          select: {
            id: true,
          },
        })
        .catch(() => {
          throw new BadRequestException('Usuário não encontrado!');
        }),
    ).then((_) =>
      this.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          email,
          updated_at: new Date(),
        },
        ...select,
      }),
    );
  }
}
