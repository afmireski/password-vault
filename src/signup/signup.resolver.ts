import { Resolver } from '@nestjs/graphql';
import { SignupService } from './signup.service';

@Resolver()
export class SignupResolver {
  constructor(private readonly signupService: SignupService) {}
}
