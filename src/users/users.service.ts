import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dtos/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: CreateUserInput, select: PrismaSelect) {
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
}
