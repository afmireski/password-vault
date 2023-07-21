import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from '../../types/custom-types';
import { FindUserByIdInput } from '../dtos/find-user-by-id.interface';
import { UserDTO } from '../dtos/user.dto';
import { UserPersistanceGateway } from './user-gateway.interface';

@Injectable()
export class UserPrismaGateway implements UserPersistanceGateway {
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
}
