import { Resolver } from '@nestjs/graphql';
import { PasswordsService } from './passwords.service';

@Resolver()
export class PasswordsResolver {
  constructor(private readonly passwordsService: PasswordsService) {}
}
