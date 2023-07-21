import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from '../types/custom-types';
import { DeleteUserInput } from './dtos/delete-user.input';
import { FindUserByIdInput } from './dtos/find-user-by-id.interface';
import { FindUserGraphQLInput } from './dtos/find-user-graphql.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserDTO } from './dtos/user.dto';
import { UserPersistanceGateway } from './gateways/user-gateway.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserPersistenceGateway')
    private readonly userGateway: UserPersistanceGateway,
  ) {}

  async findUser(request: Request<FindUserByIdInput>): Response<UserDTO> {
    return await this.userGateway.findUserById(request);
  }

  async updateUser(request: Request<UpdateUserInput>): Response<UserDTO> {
    return await this.userGateway.update(request);
  }

  /* async deleteUserInput(request: Request<DeleteUserInput>): Response<UserDTO> {
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
  } */
}
