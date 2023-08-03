import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from '../types/custom-types';
import { DeleteUserInput } from './dtos/delete-user.input';
import { FindUserByIdInput } from './dtos/find-user-by-id.interface';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserDTO } from './dtos/user.dto';
import { UserPersistanceGateway } from './gateways/user-persistance.gateway';

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

  async deleteUserInput(request: Request<DeleteUserInput>): Promise<void> {
    await this.userGateway.delete(request);
  }
}
