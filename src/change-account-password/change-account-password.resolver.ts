import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Success } from '../dtos/success.dto';
import { Response } from '../types/custom-types';
import { ChangeAccountPasswordService } from './change-account-password.service';
import { ChangeAccountPasswordGraphQLInput } from './dtos/change-account-password-graphql.input';

@Resolver()
export class ChangeAccountPasswordResolver {
  constructor(
    private readonly changeAccountPasswordService: ChangeAccountPasswordService,
  ) {}

  @Mutation(() => Success)
  @UsePipes(ValidationPipe)
  async ChangeAccountPassword(
    @Args('input') input: ChangeAccountPasswordGraphQLInput,
  ): Response<Success> {
    await this.changeAccountPasswordService.changeAccountPassword({ input });

    return { success: true };
  }
}
