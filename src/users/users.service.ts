import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import * as bcrypt from 'bcrypt';
import { User } from 'prisma/@generated/user/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';
import { CreateUserInput } from './dtos/create-user.input';
import { FindUserInput } from './dtos/find-user.input';

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
      this.prisma.extension.user.findFirstOrThrow({
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
