import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';
import { CreateUserInput } from './dtos/create-user.input';
import { DeleteUserInput } from './dtos/delete-user.input';
import { FindUserInput } from './dtos/find-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserDTO } from './dtos/user.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDTO)
  @UsePipes(ValidationPipe)
  async CreateUser(
    @Args('input') input: CreateUserInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<UserDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<CreateUserInput> = { input, select };

    return this.usersService.createUser(request);
  }

  @Query(() => UserDTO)
  @UsePipes(ValidationPipe)
  async FindUser(
    @Args() input: FindUserInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<UserDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<FindUserInput> = { input, select };

    return this.usersService.findUser(request);
  }

  @Mutation(() => UserDTO)
  @UsePipes(ValidationPipe)
  async UpdateUser(
    @Args('input') input: UpdateUserInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<UserDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<UpdateUserInput> = { input, select };

    return this.usersService.updateUser(request);
  }

  @Mutation(() => UserDTO)
  @UsePipes(ValidationPipe)
  async DeleteUser(
    @Args('input') input: DeleteUserInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<UserDTO> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<DeleteUserInput> = { input, select };

    return this.usersService.deleteUserInput(request);
  }
}
