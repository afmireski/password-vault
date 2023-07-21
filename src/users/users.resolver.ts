import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { Success } from 'src/dtos/success.dto';
import { Request, Response } from 'src/types/custom-types';
import { FindUserGraphQLInput } from './dtos/find-user-graphql.input';
import { UpdateUserGraphQLInput } from './dtos/update-user-graphql.input';
import { UserGraphQLDTO } from './dtos/user-graphql.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserGraphQLDTO)
  @UsePipes(ValidationPipe)
  async FindUser(
    @Args() input: FindUserGraphQLInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<UserGraphQLDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<FindUserGraphQLInput> = { input, select };

    return this.usersService.findUser(request);
  }

  @Mutation(() => UserGraphQLDTO)
  @UsePipes(ValidationPipe)
  async UpdateUser(
    @Args('input') input: UpdateUserGraphQLInput,
    @Info() info: GraphQLResolveInfo,
  ): Response<UserGraphQLDTO> {
    const select = new PrismaSelect(info).value;

    const request: Request<UpdateUserGraphQLInput> = { input, select };

    return this.usersService.updateUser(request);
  }

  @Mutation(() => Success)
  @UsePipes(ValidationPipe)
  async DeleteUser(
    @Args('input') input: FindUserGraphQLInput,
  ): Response<Success> {

    const request: Request<FindUserGraphQLInput> = { input };

    await this.usersService.deleteUserInput(request);

    return { success: true };
  }
}
