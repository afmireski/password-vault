import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { Request, Response } from 'src/types/custom-types';
import { FindUserInput } from './dtos/find-user-graphql.input';
import { UserGraphQLDTO } from './dtos/user-graphql.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserGraphQLDTO)
  @UsePipes(ValidationPipe)
  async FindUser(
    @Args() input: FindUserInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<UserGraphQLDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<FindUserInput> = { input, select };

    return this.usersService.findUser(request);
  }

  /* @Mutation(() => UserDTO)
  @UsePipes(ValidationPipe)
  async UpdateUser(
    @Args('input') input: UpdateUserInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<UserDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<UpdateUserInput> = { input, select };

    return this.usersService.updateUser(request);
  } */

  /* @Mutation(() => UserDTO)
  @UsePipes(ValidationPipe)
  async DeleteUser(
    @Args('input') input: DeleteUserInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<UserDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<DeleteUserInput> = { input, select };

    return this.usersService.deleteUserInput(request);
  } */
}
