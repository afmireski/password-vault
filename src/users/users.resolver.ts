import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
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
  ) {
    const select = null;

    return this.usersService.createUser(input, select);
  }
}
