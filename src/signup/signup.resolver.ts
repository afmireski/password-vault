import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Success } from 'src/dtos/success.dto';
import { SignupGraphQLInput } from './dtos/signup-graphql.input';
import { SignupService } from './signup.service';

@Resolver()
export class SignupResolver {
  constructor(private readonly signupService: SignupService) {}

  @Mutation(() => Success)
  @UsePipes(ValidationPipe)
  async SignUp(@Args('input') input: SignupGraphQLInput): Promise<Success> {
    await this.signupService.signup(input);

    return { success: true };
  }
}
