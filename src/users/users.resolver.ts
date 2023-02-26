import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Info, Query, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { User } from 'prisma/@generated/user/user.model';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';
import { CreateUserInput } from './dtos/create-user.input';
import { FindUserInput } from './dtos/find-user.input';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UsePipes(ValidationPipe)
  async CreateUser(
    @Args('input') input: CreateUserInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<User> {
    const select = new PrismaSelect(info).value;

    return this.usersService.createUser(input, select);
  }

  @Query(() => User)
  @UsePipes(ValidationPipe)
  async FindUser(
    @Args() input: FindUserInput,
    @Info() info: GraphQLResolveInfo,
  ): PrismaResponse<User> {
    const select = new PrismaSelect(info).value;

    const request: PrismaRequest<FindUserInput> = { input, select };

    return this.usersService.findUser(request);
  }
}
