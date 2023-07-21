import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from '../types/custom-types';
import { DeleteUserInput } from './dtos/delete-user.input';
import { FindUserByIdInterface } from './dtos/find-user-by-id.interface';
import { FindUserInput } from './dtos/find-user-graphql.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserDTO } from './dtos/user.dto';
import { UserPersistanceGateway } from './gateways/user-gateway.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserPersistenceGateway')
    private readonly userGateway: UserPersistanceGateway,
  ) {}

  async findUser(request: Request<FindUserByIdInterface>): Response<UserDTO> {
    return await this.userGateway.findUserById(request);
  }

  async updateUser(request: Request<UpdateUserInput>): Response<UserDTO> {
    const { input, select } = request;
    const { user_id, name, email } = input;

    const transactionArray = [];

    const findUserQuery = this.prisma.user.findFirst({
      where: {
        id: {
          equals: user_id,
        },
      },
      select: {
        id: true,
      },
    });

    transactionArray.push(findUserQuery);

    const verifyEmailQuery = this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
      select: {
        id: true,
      },
    });

    transactionArray.push(verifyEmailQuery);

    return Promise.resolve(this.prisma.$transaction(transactionArray)).then(
      ([user, validation]) => {
        if (!user) {
          throw new BadRequestException('Usuário não encontrado');
        } else if (validation) {
          throw new BadRequestException(
            `Já existe um usuário com o email: ${email}.`,
          );
        }

        return this.prisma.user.update({
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

  async deleteUserInput(request: Request<DeleteUserInput>): Response<UserDTO> {
    const { input, select } = request;
    const { user_id } = input;

    return Promise.resolve(
      this.prisma.user
        .delete({
          where: {
            id: user_id,
          },
          ...select,
        })
        .catch(() => {
          throw new InternalServerErrorException('Falha ao excluir o usuário!');
        }),
    );
  }
}
