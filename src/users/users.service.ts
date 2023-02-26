import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dtos/create-user.input';
import * as bcrypt from 'bcrypt';
import { FindUserInput } from './dtos/find-user.input';
import { User } from 'prisma/@generated/user/user.model';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    input: CreateUserInput,
    select: PrismaSelect,
  ): PrismaResponse<User> {
    const { email, name, password } = input;

    const salt = bcrypt.genSaltSync(10);

    return Promise.resolve(
      this.prisma.user.create({
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
      throw new NotFoundException('Usuário não encontrado');
    });
  }
}
