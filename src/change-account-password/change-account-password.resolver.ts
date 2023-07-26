import { Resolver } from '@nestjs/graphql';
import { ChangeAccountPasswordService } from './change-account-password.service';

@Resolver()
export class ChangeAccountPasswordResolver {
  constructor(
    private readonly changeAccountPasswordService: ChangeAccountPasswordService,
  ) {}
}
