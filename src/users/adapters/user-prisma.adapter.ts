import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from '../../types/custom-types';
import { FindUserByIdInput } from '../dtos/find-user-by-id.interface';
import { UpdateUserInput } from '../dtos/update-user.input';
import { UserDTO } from '../dtos/user.dto';
import { UserPersistanceGateway } from '../gateways/user-persistance.gateway';

@Injectable()
export class UserPrismaAdapter implements UserPersistanceGateway {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(request: Request<FindUserByIdInput>): Response<UserDTO> {
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

  async update(request: Request<UpdateUserInput>): Response<UserDTO> {
    const { input, select } = request;
    const { user_id, name, email } = input;

    const transactionArray = [];

    const findUserQuery = this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
      },
    });

    transactionArray.push(findUserQuery);

    const verifyEmailQuery = this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    transactionArray.push(verifyEmailQuery);

    return Promise.resolve(this.prisma.$transaction(transactionArray)).then(
      async ([user, validation]) => {
        if (!user) {
          throw new BadRequestException('Usuário não encontrado');
        } else if (validation) {
          throw new BadRequestException(
            `Já existe um usuário cadastrado com o email: ${email}.`,
          );
        }

        return await this.prisma.user.update({
          where: {
            id: user_id,
          },
          data: {
            name,
            email: email,
            updated_at: new Date(),
          },
          ...select,
        });
      },
    );
  }

  async delete(request: Request<FindUserByIdInput>): Promise<void> {
    const { input } = request;
    const { user_id } = input;

    await this.prisma.user
      .delete({
        where: {
          id: user_id,
        },
        select: {
          id: true,
        },
      })
      .catch((e) => {
        console.error(e);
        throw new InternalServerErrorException('Falha ao excluir o usuário!');
      });
  }
}
