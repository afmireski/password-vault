import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Info, Query, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { User } from 'prisma/@generated/user/user.model';
import { CreateUserInput } from './dtos/create-user.input';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UsePipes(ValidationPipe)
  async CreateUser(
    @Args('input') input: CreateUserInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    const select = new PrismaSelect(info).value;

    return this.usersService.createUser(input, select);
  }

  @Query(() => String)
  async FindUser(): Promise<string> {
    return 'test';
  }
}
